import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotalAmount,
    selectCartTotalQuantity,
} from "../../redux/cart/cart.slice";
import {
    selectShippingAddress,
    selectBillingAddress,
} from "../../redux/checkout/checkout.slice"
import { currentUserSelector } from "../../redux/user/user.selector.js";
import "./checkout.styles.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { CheckoutForm } from "../../components/import.components";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)


const Checkout = () => {
    const currentUser = useSelector(currentUserSelector);
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const shippingAddress = useSelector(selectShippingAddress);
    const billingAddress = useSelector(selectBillingAddress);

    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState("Initializing checkout");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:4242/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: cartItems,
                totalAmount: cartTotalAmount,
                userEmail: currentUser.email,
                shipping: shippingAddress,
                billing: billingAddress,
                description: `eSop payment: email: ${currentUser.email},
                Amount: ${cartTotalAmount}`
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((json) => Promise.reject(json))
                }
            })
            .then((data) => {
                setClientSecret(data.clientSecret);
            })
            .catch((error) => {
                console.log(error);
                setMessage("Failed to initialize checkout");
                toast.error("Something went wrong!!!");
            });
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return (
        <Fragment>
            {!clientSecret &&
                <section>
                    <div className="container">
                        <h3>{message}</h3>
                    </div>
                </section>
            }
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </Fragment>
    )
}

export default Checkout;