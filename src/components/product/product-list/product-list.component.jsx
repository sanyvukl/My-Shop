import { useState, Fragment } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { Search } from "../../import.components";
import { ProductItem } from "../product.imports";
import { Pagination } from "../../import.components.js";
import "./product-list.styles.scss";

const ProductList = ({ products, filter, handleChange }) => {
  const [grid, setGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(6);

  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let totalPages = Math.ceil(products.length / itemsPerPage);


  return (
    <div className={"product-list"}>
      <div className={"top"}>
        <div className={"icons"}>
          <BsFillGridFill
            size={22}
            color={grid ? `orangered` : "#0a1930"}
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            size={24}
            color={!grid ? `orangered` : "#0a1930"}
            onClick={() => setGrid(false)}
          />

          <p>
            <b>{products.length}</b> Products found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={filter.name} handleChange={handleChange} />
        </div>

        {/* Sort */}
        <div className={"sort"}>
          <label>Sort by</label>
          <select name="sortBy" onChange={handleChange} value={filter.sortBy}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest price</option>
            <option value="highest-price">Highest price</option>
            <option value="a - z">A - Z</option>
            <option value="z - a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? "grid" : "list"}>
        {products?.length === 0 ? (
          <p>No product found</p>
        ) : (
          <Fragment>
            {products
              .slice(indexOfFirstItem, indexOfLastItem)
              .map((product) => {
                return (
                  <div key={product.id}>
                    <ProductItem grid={grid} product={product} />
                  </div>
                );
              })}
          </Fragment>
        )}
      </div>
      <Pagination products={products} totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

export default ProductList;
