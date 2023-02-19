import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card } from "../../import.components";
import imageGif from '../../../assets/gif/loader.gif';
import { ProductCard } from "./product-item.styles";
import { ADD_TO_CART } from "../../../redux/cart/cart.slice";

const ProductItem = ({ product, grid }) => {
  const dispatch = useDispatch();
  const { imageUrls, name, price, desc } = product.data;

  const shortenText = (text, lenght) => {
    if (text.length > lenght) {
      const newText = text.substring(0, lenght).concat("....")
      return newText;
    } else {
      return text;
    }
  }
  const addItemToCart = () => {
    dispatch(ADD_TO_CART({ product: product }));
  }

  return (
    <ProductCard>
      <Card cardClass={grid ? "grid" : "list"}>
        <Link to={`/product-details/${product.id}`}>
          <div className="img">
            <img src={imageUrls[0]} style={{ width: '218px', height: "218px", background: `url(${imageGif}) center no-repeat` }} alt={name} />
          </div>
        </Link>
        <div className="product-item-content">
          <div className="details">
            <p>${price}</p>
            <h4>{shortenText(name, 18)}</h4>
          </div>
          {!grid && <p className="desc">
            {shortenText(desc, 200)}
          </p>}
          <button className="--btn --btn-danger" onClick={() => addItemToCart()}>Add To Cart</button>
        </div>
      </Card>
    </ProductCard>
  )
}

export default ProductItem