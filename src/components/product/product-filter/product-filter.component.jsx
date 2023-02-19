import { Fragment } from "react";
import { useSelector } from "react-redux";
import { productsSelector } from "../../../redux/product/product.slice";
import "./product-filter.styles.scss";


const ProductFilter = ({ filter, handleChange, onClearFilter, min, max }) => {
  const products = useSelector(productsSelector);


  const allCategories = [
    "All",
    ...new Set(products.map((current) =>
      current.data.category))
  ]
  const allBrands = [
    "All",
    ...new Set(products.map((current) =>
      current.data.brand))
  ]

  return (
    <Fragment>
      <h4>Categories</h4>
      <div className="category">
        {!allCategories ?
          <Fragment>
            <button name="category" onClick={handleChange} className={filter.category === 'All' ? "" : ""} value="All">All</button>
            <button name="category" onClick={handleChange} className={filter.category === 'Laptop' ? "" : ""} value="Laptop">Laptop</button>
            <button name="category" onClick={handleChange} className={filter.category === 'Fashion' ? "" : ""} value="Fashion">Fashion</button>
            <button name="category" onClick={handleChange} className={filter.category === 'Phone' ? "" : ""} value="Phone">Phone</button>
          </Fragment>
          :
          <Fragment>
            {allCategories.map((category, index) => {
              return <button key={index} name="category" onClick={handleChange} className={filter.category === category ? "active" : ""}
                value={category}>&#8250; {category}</button>
            })}
          </Fragment>
        }
      </div>
      <h4>Brand</h4>
      <div className="brand">
        <select name="brand" onChange={handleChange} value={filter.brand}>
          {!allBrands
            ?
            <Fragment>
              <option value="All">All</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </Fragment>
            :
            <Fragment>
              {allBrands.map((brand, index) => {
                return <option key={index} value={brand}>{brand}</option>
              })}
            </Fragment>
          }
        </select>
      </div>
      <h4>Price</h4>
      <p>${min} - ${filter.price}</p>
      <div className="price">
        <input type="range" name="price" onChange={handleChange} value={filter.price} min={min} max={max} />
      </div>
      <br />
      <button className="--btn --btn-danger" onClick={onClearFilter}>Clear Filter</button>
    </Fragment>
  )
}

export default ProductFilter