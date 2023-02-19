import { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ADD_TO_CART } from "../../../redux/cart/cart.slice";
import { getProductById, getReviewsToProductByID } from "../../../utils/firebase/firebase.utils";
import { Spinner, Card } from "../../import.components";
import StartsRating from "react-star-rate";
import "./product-details.styles.scss";
const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState();
    const [productReviews, setProductReviews] = useState([]);

    const increaseProduct = () => {
        setProduct({ ...product, extraQuantity: product.extraQuantity < 3 ? product.extraQuantity + 1 : 3 });
    }
    const decreaseProduct = () => {
        setProduct({ ...product, extraQuantity: product.extraQuantity > 1 ? product.extraQuantity - 1 : 1 });
    }
    const addProduct = () => {
        dispatch(ADD_TO_CART({ product }));
    }

    useEffect(() => {
        const unsubscribe = async () => {
            const getProtuct = await getProductById(params.productID);
            setProduct({ ...getProtuct, extraQuantity: 1 });
            const getReviews = await getReviewsToProductByID(params.productID);
            setProductReviews(getReviews);
        }
        unsubscribe();
    }, [params.productID]);

    console.log(productReviews);

    return (product
        ?
        <section>
            <div className="container product-details">
                <h2>Product Details</h2>
                <div>
                    <Link to="/#products">&larr; Back To Products</Link>
                </div>
                <div className="details">
                    <div className="img">
                        <img src={product?.data.imageUrls[0]} alt={product?.data.name} />
                    </div>
                    <div className="content">
                        <h3>{product?.data.name}</h3>
                        <p className="price">${product?.data.price}</p>
                        <p>{product?.data.desc}</p>
                        <p>
                            <b>SKU:</b> {params.productID}
                        </p>
                        <p>
                            <b>Brand:</b> {product?.data.brand}
                        </p>
                        <div className="count">
                            <button className="--btn" onClick={decreaseProduct}>-</button>
                            <p>
                                <b>{product.extraQuantity}</b>
                            </p>
                            <button className="--btn" onClick={increaseProduct}>+</button>
                        </div>
                        <button className="--btn --btn-danger" onClick={addProduct}>
                            ADD TO CART
                        </button>
                    </div>
                </div>

                <Card cardClass={"card"}>
                    <h3>Product Reviews</h3>
                    <div>
                        {productReviews.length === 0 ? (
                            <p>There are no reviews for this product yet.</p>
                        ) :
                            <Fragment>
                                {productReviews.map((comment, index) => {
                                    const { userName, rate, reviewDate, review } = comment;
                                    return <div className="review" key={index}>
                                        <StartsRating value={rate} />
                                        <p>{review}</p>
                                        <span>
                                            <b>{reviewDate}</b>
                                        </span>
                                        <br />
                                        <span>
                                            <b>By:{userName}</b>
                                        </span>
                                    </div>
                                })}
                            </Fragment>
                        }
                    </div>
                </Card>
            </div>
        </section>
        : <Spinner />
    )
}

export default ProductDetails