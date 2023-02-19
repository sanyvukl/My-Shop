import { useSelector, useDispatch } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import { productsSelector } from "../../redux/product/product.slice";
import { selectFilteredProducts, SET_FILTER, RESET_FILTER } from "../../redux/filter/filter.slice";
import { ProductFilter, ProductList } from "./product.imports";
import { Spinner } from "../import.components";
import "./product.styles.scss";
import { FaCogs } from "react-icons/fa";

const getMinNMax = (arr) => {
  let prices = [];
  let max = 0;
  let min = arr[0].data.price;

  arr.forEach(el => prices.push(el.data.price));

  prices.forEach(price => {
    price > max && (max = price);
    price < min && (min = price);
  });

  return { min, max };
}


const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector);
  const filtredProducts = useSelector(selectFilteredProducts);
  const [showFilter, setShowFilter] = useState(false);
  const defaultFilter = {
    name: "",
    brand: "All",
    category: "All",
    price: getMinNMax(products).max,
    sortBy: "latest",
  };
  const [filter, setFilter] = useState(defaultFilter);

  useEffect(() => {
    dispatch(SET_FILTER({ products, filters: filter }));
  }, [])

  const toggleShowFitler = () => setShowFilter(!showFilter);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    dispatch(SET_FILTER({ products, filters: { ...filter, [name]: value } }));
  };
  const handleClearFilter = () => {
    setFilter(defaultFilter);
    dispatch(RESET_FILTER({ products }));
  };

  return (
    <section id="products">
      <div className="container products-container" >
        {products.length > 0 ? (
          <Fragment>
            <aside className={showFilter ? "filter show" : 'filter'}>
              <ProductFilter
                filter={filter}
                handleChange={handleChange}
                onClearFilter={handleClearFilter}
                min={getMinNMax(products).min}
                max={getMinNMax(products).max}
              />
            </aside>
            <div className="content">
              <ProductList
                filter={filter}
                products={Array.isArray(filtredProducts) ? filtredProducts : products}
                handleChange={handleChange}
              />
              <div className="icon" onClick={() => toggleShowFitler()} style={{ userSelect: "none" }}>
                <FaCogs size={20} color="orangered" />
                <p style={{ userSelect: "none" }}>
                  <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
                </p>
              </div>
            </div>
          </Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
};

export default Product;
