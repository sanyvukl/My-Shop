import "./checkout-form.styles.scss";
import { useEffect, useState } from "react";
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

    const cartItems = useSelector(selectCartItems);
    const currentUser = useSelector(currentUserSelector);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const shippingAddress = useSelector(selectShippingAddress);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

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

        setIsLoading(true);

        saveOrder();
        setIsLoading(false);
    };

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
                            <h5>Card number</h5>
                            <p>4242 4242 4242 4242</p>
                            <h5>Valid date</h5>
                            <p>24/42</p>
                            <h5>CVV</h5>
                            <p>424</p>
                            <button disabled={isDisabled || isLoading} className="button" id="submit">
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