import "./chart.styles.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from "../import.components";
import { selectTotalAmount } from "../../redux/order/order.slice";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};

const getTotalByType = (orders, type) => {
    return orders.filter((order) => order.data.orderStatus.includes(type)).length;
}

const Chart = ({ orders }) => {
    const placed = getTotalByType(orders, "Placed"),
        processing = getTotalByType(orders, "Processing"),
        shipped = getTotalByType(orders, "Shipped"),
        delivered = getTotalByType(orders, "Delivered");


    const data = {
        labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
        datasets: [
            {
                label: '- Order Count',
                data: [placed, processing, shipped, delivered],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <div className="charts">
            <Card cardClass={"card"}>
                <h3>Order Status Chart</h3>
                <Bar options={options} data={data} />
            </Card>
        </div>
    )
}

export default Chart;