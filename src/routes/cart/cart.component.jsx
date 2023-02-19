import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../../components/import.components";
import { FaTrashAlt } from "react-icons/fa";
import loaderImg from "../../assets/gif/loader.gif";
import {
    selectCartItems,
    selectCartTotalAmount,
    selectCartTotalQuantity,
    DELETE_FROM_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SAVE_URL,
} from "../../redux/cart/cart.slice";
import { currentUserSelector } from "../../redux/user/user.selector";
import "./cart.styles.scss";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const currentUser = useSelector(currentUserSelector);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    const handleAddProduct = (product) => {
        dispatch(ADD_TO_CART({ product }));
    };
    const handleDeleteProduct = (product) => {
        dispatch(DELETE_FROM_CART({ product }));
    };
    const handleRemoveProduct = (product) => {
        dispatch(REMOVE_FROM_CART({ product }));
    };
    const handleClearCart = () => {
        dispatch(CLEAR_CART());
    };
    const handleGoToCheckout = () => {
        const url = window.location.href;
        if (currentUser) {
            navigate("/checkout-details");
        } else {
            dispatch(SAVE_URL(url));
            navigate("/login");
        }
    }

    return (
        <section>
            <div className="container table">
                <h2>Shoping Cart</h2>
                {cartItems.length === 0 ? (
                    <Fragment>
                        <p>Your cart is currently empty.</p>
                        <br />
                        <div>
                            <Link to={"/#products"}>&larr; Continue shopping</Link>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <table>
                            <thead>
                                <tr>
                                    <th>s/n</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((product, index) => {
                                    const {
                                        id,
                                        data: { name, price, imageUrls },
                                        quantity,
                                    } = product;
                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <p>
                                                    <b>{name}</b>
                                                </p>
                                                <img
                                                    src={imageUrls[0]}
                                                    alt={name}
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        background: `url(${loaderImg}) center no-repeat`,
                                                    }}
                                                />
                                            </td>
                                            <td>${price}</td>
                                            <td>
                                                <div className="count">
                                                    <button
                                                        className="--btn"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDeleteProduct(product);
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                    <p>
                                                        <b>{quantity}</b>
                                                    </p>
                                                    <button
                                                        className="--btn"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleAddProduct(product);
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>${(price * quantity).toFixed(2)}</td>
                                            <td>
                                                <FaTrashAlt
                                                    color="red"
                                                    size={18}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleRemoveProduct(product)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="summary">
                            <button className="--btn --btn-danger" onClick={handleClearCart}>Clear Cart</button>
                            <div className="checkout">
                                <div>
                                    <Link to={"/#products"}>&larr; Continue shopping</Link>
                                </div>
                                <br />
                                <Card cardClass="card">
                                    <p>Cart item(s): {cartTotalQuantity}</p>
                                    <div className="text">
                                        <h4>Subtotal:</h4>
                                        <h3>${cartTotalAmount.toFixed(2)}</h3>
                                    </div>
                                    <p>Tax and shipping calculated at checkout</p>
                                    <button className="--btn --btn-primary --btn-block" onClick={handleGoToCheckout}>Checkout</button>
                                </Card>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        </section>
    );
};

export default Cart;
