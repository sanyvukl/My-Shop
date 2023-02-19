import "./checkout-form.styles.scss";
import { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../../import.components";
import { Card, CheckoutSummary } from "../../import.components";
import { toast } from "react-toastify";
import { addOrderDocument } from "../../../utils/firebase/firebase.utils.js";
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from "../../../redux/cart/cart.slice";
import { currentUserSelector } from "../../../redux/user/user.selector";
import { selectShippingAddress } from "../../../redux/checkout/checkout.slice";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const cartItems = useSelector(selectCartItems);
    const currentUser = useSelector(currentUserSelector);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const shippingAddress = useSelector(selectShippingAddress);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

    }, [stripe]);

    const saveOrder = () => {
        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleDateString();
        const orderConfig = {
            userRef: currentUser.userID,
            userEmail: currentUser.email,
            orderDate: date,
            orderTime: time,
            orderAmount: cartTotalAmount,
            orderStatus: "Order Placed...",
            cartItems,
            shippingAddress,
            createdAt: Timestamp.now().toDate(),
        };
        try {
            addOrderDocument(orderConfig);
            toast.success("Order Saved");
            dispatch(CLEAR_CART());
            navigate("/checkout-success");
        } catch (error) {
            toast.error(error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        setMessage(null);
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        // const confirmPayment = await stripe.confirmPayment({
        //     elements,
        //     confirmParams: {
        //         // Make sure to change this to your payment completion page
        //         return_url: "http://localhost:3000/checkout-success",
        //     },
        //     redirect: "if_required",
        // }).then((result) => {
        //     if (result.error) {
        //         toast.error(result.error.message);
        //         setMessage(result.error.message);
        //         return;
        //     }
        //     if (result.paymentIntent) {
        //         if (result.paymentIntent.status === "succeeded") {
        //             saveOrder();
        //             toast.success("Payment successful");
        //             setIsLoading(false);
        //         }
        //     }
        // })
        saveOrder();
        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <section>
            <div className="container checkout-form">
                <h2>Checkout</h2>
                <form onSubmit={handleSubmit} method={"post"}>
                    <div className="form-item">
                        <CheckoutSummary />
                    </div>
                    <div className="form-item">
                        <Card cardClass="card pay">
                            <h3>Stripe Checkout</h3>
                            <PaymentElement id="payment-element" options={paymentElementOptions} />
                            <button disabled={isDisabled || isLoading || !stripe || !elements} className="button" id="submit">
                                <span id="button-text">
                                    {isLoading ? <Spinner /> : "Pay now"}
                                </span>
                            </button>
                            {/* Show any error or success messages */}
                            {message && <div id="payment-message">{message}</div>}
                        </Card>
                    </div>
                </form>
            </div >
        </section >
    );
}
export default CheckoutForm;