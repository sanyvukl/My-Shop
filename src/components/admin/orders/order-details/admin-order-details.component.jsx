import { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchDocument from '../../../../utils/customHook/useFetchDocument';
import { Spinner, OrderInfo } from '../../../import.components';
import loaderImg from "../../../../assets/gif/loader.gif";
import { ChangeOrderStatus } from '../../import.admin.components';
const AdminOrderDetails = () => {
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

        <div className='table'>
            <h2>Order Details</h2>
            <div>
                <Link to={"/admin/orders"}>
                    &larr; Back To Orders
                </Link>
                <br />
                {order === null ?
                    <Spinner /> :
                    <Fragment>
                        <OrderInfo order={order} />
                        <br />
                        <table>
                            <thead>
                                <tr>
                                    <th>s/n</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
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
                                            <p>{name}</p>
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
                                        <td style={{ "textAlign": "center" }}><b>{quantity}</b></td>
                                        <td>${(price * quantity).toFixed(2)}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <br />
                        <br />
                        <ChangeOrderStatus order={order} />
                    </Fragment>
                }
            </div>
        </div>

    )
}

export default AdminOrderDetails;