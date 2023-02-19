import { Spinner } from "../import.components";
import "./order.table.styles.scss";

const OrderTable = ({ orders, handleClick }) => {
  return orders.length ? (
    <div className="order-history">
      {orders.length && orders.length === 0 ? (
        <p>No order found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Date</th>
              <th>Order ID</th>
              <th>Order Amount</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const {
                id,
                data: { orderDate, orderTime, orderAmount, orderStatus },
              } = order;

              return (
                <tr key={id} onClick={() => handleClick(id)}>
                  <td>{index + 1}</td>
                  <td>
                    {orderDate} at {orderTime}
                  </td>
                  <td>{id}</td>
                  <td>${orderAmount}</td>
                  <td>
                    <p
                      className={
                        orderStatus !== "Delivered" ? "pending" : "delivered"
                      }
                    >
                      {orderStatus}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  ) : (
    <Spinner />
  );
};

export default OrderTable;
