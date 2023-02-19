import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UPDATE_ORDER } from "../../../../redux/order/order.slice";
import { updateOrderDocument } from "../../../../utils/firebase/firebase.utils";
import { Spinner, Card } from "../../../import.components";
import "./change-order-status.styles.scss";

const ChangeOrderStatus = ({ order }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = async (e) => {
    e.preventDefault();
    if (status === "") return;
    setIsLoading(true);
    try {
      await updateOrderDocument({ ...order, orderStatus: status });
      dispatch(UPDATE_ORDER({ id: order.id, data: { ...order, orderStatus: status } }));
      toast.success("Order Status Updated");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Spinner />}

      <Card cardClass="status">
        <div style={{ "padding": "10px" }}>
          <h4>Update Status</h4>
          <form onSubmit={editOrder}>
            <span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="" disabled>-- Choose One --</option>
                <option value="Processing...">Processing...</option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">Update Status</button>
            </span>
          </form>
        </div>
      </Card>
    </>
  )
}

export default ChangeOrderStatus;