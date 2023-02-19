import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const getFiltredProducts = (products, filters) => {
  const filtered = products.filter((element) => {
    const { name, brand, price, category } = element?.data;
    return (
      name.toLowerCase().includes(filters.name) &&
      price <= filters.price &&
      (filters?.brand !== "All"
        ? brand.toLowerCase().includes(filters?.brand.toLowerCase())
        : true) &&
      (filters?.category !== "All"
        ? category.toLowerCase().includes(filters?.category.toLowerCase())
        : true)
    );
  });

  const Sort = (prd) => {
    let sorted = prd;
    switch (filters.sortBy) {
      case "highest-price": {
        sorted.sort((a, b) => {
          return b.data.price > a.data.price ? 1 : -1;
        });
        break;
      }
      case "lowest-price": {
        sorted.sort((a, b) => {
          return a.data.price > b.data.price ? 1 : -1;
        });
        break;
      }
      case "a - z": {
        sorted.sort((a, b) => {
          return a.data.name.localeCompare(b.data.name);
        });
        break;
      }
      case "z - a": {
        sorted.sort((a, b) => {
          return b.data.name.localeCompare(a.data.name);
        });
        break;
      }
      default: {
        break;
      }
    }
    return sorted;
  };

  return Sort(filtered);
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Actions
    FILTER_BY_SEARCH: (state, action) => {
      const { products = [], search } = action.payload;
      state.filteredProducts = products.filter(
        (element) =>
          element.name.toLowerCase().includes(search.toLowerCase()) ||
          element.brand.toLowerCase().includes(search.toLowerCase()) ||
          element.category.toLowerCase().includes(search.toLowerCase())
      );
    },
    SET_FILTER: (state, action) => {
      const { products = [], filters = {} } = action.payload;
      state.filteredProducts = getFiltredProducts(products, filters);
    },
    RESET_FILTER: (state, action) => {
      const { products } = action.payload;
      state.filteredProducts = products;
    },
  },
});

export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export const { FILTER_BY_SEARCH, SET_FILTER, RESET_FILTER } =
  filterSlice.actions;

export default filterSlice.reducer;
