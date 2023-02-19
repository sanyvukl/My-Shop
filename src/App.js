import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Cart from "./routes/cart/cart.component";
import Contact from "./routes/contact/contact.component";
import { Login, Register, Reset } from "./routes/auth/import.auth";
import { Header, Footer, AdminRoute } from "./components/import.components";
import {
  AdminHome,
  AdminOrders,
  AddProduct,
  ViewProducts,
  EditProduct,
  AdminOrderDetails,
} from "./components/admin/import.admin.components";
import { ProductDetails } from "./components/product/product.imports";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getProductsDocuments,
  getOrdersDocuments,
} from "./utils/firebase/firebase.utils";
import { SET_ACTIVE_USER } from "./redux/user/user.slice";
import { GET_PRODUCTS } from "./redux/product/product.slice";
import { STORE_ORDERS } from "./redux/order/order.slice";
import "./App.scss";
import Checkout from "./routes/checkout/checkout.component";
import CheckoutDetails from "./routes/checkout/checkout-details.component";
import CheckoutSuccess from "./routes/checkout/checkout-success.component";
import OrderHistory from "./routes/order/orderHistory/order-history.component";
import OrderDetails from "./routes/order/orderDetails/order-details.component";
import ReviewProducts from "./routes/review-products/review-products.component";
import NotFound from "./routes/not-found/not-found.component";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = async () => {
      onAuthStateChangedListener(async (user) => {
        console.log(user);
        if (user) {
          const newName =
            user.displayName === null
              ? user.email.charAt(0).toUpperCase() +
                user.email.slice(1, user.email.indexOf("@"))
              : user.displayName;

          await createUserDocumentFromAuth(user);
          dispatch(
            SET_ACTIVE_USER({
              currentUser: {
                email: user.email,
                userName: user.displayName || newName,
                userID: user.uid,
              },
            })
          );
        }
      });
    };
    unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = async () => {
      const productsArray = await getProductsDocuments();
      if (productsArray) {
        dispatch(GET_PRODUCTS(productsArray));
      }
    };
    unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = async () => {
      const data = await getOrdersDocuments();
      if (data) {
        dispatch(STORE_ORDERS(data));
      }
    };
    unsubscribe();
  }, []);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/checkout-details" element={<CheckoutDetails />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/order-details/:orderID" element={<OrderDetails />} />
        <Route path="/review-product/:productID" element={<ReviewProducts />} />
        <Route
          path="/product-details/:productID"
          element={<ProductDetails />}
        />
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="create-product" element={<AddProduct />} />
          <Route path="order-details/:orderID" element={<AdminOrderDetails />} />
          <Route path="edit-product/:productID" element={<EditProduct />} />
          <Route path="all-products" element={<ViewProducts />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
