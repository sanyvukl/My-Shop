import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from "../../../redux/cart/cart.slice"
import "./checkout.summary.styles.scss";
import { Card } from "../../import.components";

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    return (
        <Card>
            <h3>
                Checkout Summary
            </h3>
            <div>
                {cartItems.length === 0 ?
                    <Fragment>
                        <p>No item in your cart.</p>
                        <Link className="--btn">&Larr;Back To Shop</Link>
                    </Fragment>
                    :
                    <div>
                        <p>
                            <b>Cart item(s): {cartTotalQuantity}</b>
                        </p>
                        <div className="text">
                            <h4>Subtotal:</h4>
                            <h3>${cartTotalAmount.toFixed(2)}</h3>
                        </div>
                        {cartItems.map((product) => {
                            const { id, data: { price, name, }, quantity } = product;
                            return (
                                <Card cardClass={"card-wrap"} key={id}>
                                    <h4>Product: {name}</h4>
                                    <p>Quantity: {quantity}</p>
                                    <p>Unit price: ${price}</p>
                                    <p>Total price: ${price * quantity}</p>
                                </Card>
                            )
                        })}
                    </div>
                }
            </div>
        </Card>
    )
}

export default CheckoutSummary;