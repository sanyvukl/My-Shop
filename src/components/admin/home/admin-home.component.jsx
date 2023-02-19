import { Chart, InfoBox } from "../../import.components";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import "./admin-home.styles.scss";
import { useSelector } from "react-redux";
import { selectOrderHistory, selectTotalAmount } from "../../../redux/order/order.slice";
// Icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const AdminHome = () => {
    const orders = useSelector(selectOrderHistory);
    const totalOrderAmount = useSelector(selectTotalAmount);

    return (
        <div>
            <h2>Admin Home</h2>
            <div className="box-info">
                <InfoBox
                    card={"card card1"}
                    title="Earnings"
                    count={`$${totalOrderAmount}`}
                    icon={earningIcon}
                />
                <InfoBox
                    card={"card card2"}
                    title="Products"
                    count={15}
                    icon={productIcon}
                />
                <InfoBox
                    card={"card card3"}
                    title="Orders"
                    count={orders.length}
                    icon={ordersIcon}
                />
            </div>
            <Chart orders={orders} />
        </div>
    );
};

export default AdminHome;
