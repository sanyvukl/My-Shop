require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// app.use(express.static("public"));
const app = express();
app.use(cors());
app.use(express.json());

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get((req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
app.get("/", (req, res) => {
  res.send("Welcome to eSop website");
});

const calculateOrderAmount = (items) => {
  const orderAmount = items.reduce((acc, current) => {
    return (acc += current.quantity * current.data.price);
  }, 0);

  return orderAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description, userEmail } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
    receipt_email: userEmail,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
