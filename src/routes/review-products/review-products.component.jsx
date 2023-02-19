import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import StartsRating from "react-star-rate";
import { Card } from '../../components/import.components';
import { productsSelector } from '../../redux/product/product.slice';
import { currentUserSelector } from '../../redux/user/user.selector';
import { addReviewDocument } from '../../utils/firebase/firebase.utils';
import { toast } from "react-toastify";
import "./review-products.styles.scss";

const ReviewProducts = () => {
  const { productID } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(currentUserSelector);
  const products = useSelector(productsSelector);
  const product = products.find((item) => item.id === productID);

  const [rate, setRate] = useState(5);
  const [review, setReview] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await addReviewDocument({
        userName: currentUser.userName,
        userID: currentUser.userID,
        productName: product.data.name,
        productID,
        rate,
        review,
        reviewDate: new Date().toDateString(),
        createdAt: Timestamp.now().toDate(),
      });
      toast.success("Review submitted");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  return (
    <section>
      <div className="container review">
        <h2>Review Products</h2>
        <p>
          <b>Product name: </b> {product.data.name}
        </p>
        <img src={product.data.imageUrls[0]} alt={product.data.name} width={200} />
        <Card cardClass={"card"}>
          <form onSubmit={submitReview}>
            <label htmlFor="">Rating:</label>
            <StartsRating value={rate} onChange={(value) => { setRate(value) }} />
            <label htmlFor="">Review:</label>
            <textarea value={review} onChange={(e) => { setReview(e.target.value) }} cols="30" rows="10" />
            <button className="--btn --btn-primary">Submit Review</button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default ReviewProducts;