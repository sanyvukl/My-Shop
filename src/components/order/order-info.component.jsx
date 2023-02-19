import { Fragment } from "react";

const OrderInfo = ({ order }) => {
  return (
    <Fragment>
      <p>
        <b>Order ID:</b> {order.id}
      </p>
      <p>
        <b>Order Amount:</b> ${order.orderAmount}
      </p>
      <p>
        <b>Order Status:</b> {order.orderStatus}
      </p>
      <p>
        <b>Shipping Address:</b>
        <br />
        <span style={{ fontWeight: "500" }}>Person:</span>  {order.shippingAddress.name}
        <br />
        <span style={{ fontWeight: "500" }}>Address:</span>  {order.shippingAddress.line1}, {order.shippingAddress.city}
        <br />
        <span style={{ fontWeight: "500" }}>State:</span>  {order.shippingAddress.state}
        <br />
        <span style={{ fontWeight: "500" }}>Country:</span> {order.shippingAddress.country}
      </p>
    </Fragment>
  )
}

export default OrderInfo;