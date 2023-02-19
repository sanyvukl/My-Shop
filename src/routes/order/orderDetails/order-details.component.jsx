import { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchDocument from '../../../utils/customHook/useFetchDocument';
import { Spinner, OrderInfo } from "../../../components/import.components";
import loaderImg from "../../../assets/gif/loader.gif";
import "./order-details.styles.scss";

const OrderDetails = () => {
    const params = useParams();
    const { document, isLoading } = useFetchDocument("orders", params.orderID);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        setOrder(document);
    }, [document]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <section>
            <div className='container table'>
                <h2>Order Details</h2>
                <div>
                    <Link to={"/order-history"}>
                        &larr; Back To Orders
                    </Link>
                    <br />
                    {order === null ?
                        <Spinner /> :
                        <Fragment>
                            <OrderInfo order={order} />
                            <table style={{ marginTop: "20px" }}>
                                <thead>
                                    <tr>
                                        <th>s/n</th>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.cartItems.map((product, index) => {
                                        const {
                                            id,
                                            data: { name, price, imageUrls },
                                            quantity,
                                        } = product;

                                        return <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
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
                                            <td>{name}</td>
                                            <td>${price}</td>
                                            <td style={{ "textAlign": "center" }}>{quantity}</td>
                                            <td>${(price * quantity).toFixed(2)}</td>
                                            <td>
                                                <Link to={`/review-product/${id}`}>
                                                    <button className="--btn --btn-primary">Review Product</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </Fragment>
                    }
                </div>
            </div>
        </section>
    )
}

export default OrderDetails;