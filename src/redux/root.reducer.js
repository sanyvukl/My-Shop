import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import productReducer from "./product/product.slice.js";
import filterReducer from "./filter/filter.slice";
import cartReducer from "./cart/cart.slice";
import checkoutReducer from "./checkout/checkout.slice";
import orderReducer from "./order/order.slice";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
});

export default rootReducer;
