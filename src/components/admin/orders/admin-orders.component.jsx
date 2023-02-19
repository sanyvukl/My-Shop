import "./admin-orders.styles.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectOrderHistory } from "../../../redux/order/order.slice";
import { OrderTable, Pagination } from "../../import.components";

const AdminOrders = () => {
    const navigate = useNavigate();
    const orders = useSelector(selectOrderHistory);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let totalPages = Math.ceil(orders.length / itemsPerPage);

    const ordersArr = orders.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (orderID) => {
        navigate(`/admin/order-details/${orderID}`);
    }

    return (
        <div className="table">
            <h2>All Orders</h2>
            <p>Open an order to <b>Change Order Status</b></p>
            <OrderTable orders={ordersArr} handleClick={handleClick} />
            {
                orders.length > 10 &&
                <Pagination orders={orders} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            }
        </div>)
}

export default AdminOrders;