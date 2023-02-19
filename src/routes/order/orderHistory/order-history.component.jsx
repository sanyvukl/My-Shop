import "./order-history.styles.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../../utils/firebase/firebase.utils";
import { OrderTable } from "../../../components/import.components";
import { selectUserOrders, STORE_USER_ORDERS, } from "../../../redux/order/order.slice";
import { currentUserSelector } from "../../../redux/user/user.selector";

const OrderHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(selectUserOrders);
    const currentUser = useSelector(currentUserSelector);

    useEffect(() => {
        const unsubscribe = async () => {
            const data = await getUserOrders(currentUser.userID);
            if (data) {
                dispatch(STORE_USER_ORDERS(data));
            }
        };
        unsubscribe();
    }, []);

    const handleClick = (orderID) => {
        return navigate(`/order-details/${orderID}`);
    }

    return (
        <section>
            <div className="container order">
                <h2>Your Order History</h2>
                <p>Open an order to leave a <b>Product Review</b></p>
            </div>
           <OrderTable orders={orders} handleClick={handleClick} />
        </section>
    )
}

export default OrderHistory;