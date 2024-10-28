/* eslint-disable no-constant-binary-expression */
/* eslint-disable react/prop-types */
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/home"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/cart"
          element={
            <RouteControl>
              <CartPage />
            </RouteControl>
          }
        />
        <Route
          path="/bills"
          element={
            <RouteControl>
              <BillPage />
            </RouteControl>
          }
        />
        <Route
          path="/customer"
          element={
            <RouteControl>
              <CustomerPage />
            </RouteControl>
          }
        />
        <Route
          path="/statistic"
          element={
            <RouteControl>
              <StatisticPage />
            </RouteControl>
          }
        />
        <Route
          path="/products"
          element={
            <RouteControl>
              <ProductPage />
            </RouteControl>
          }
        />
        <Route
          path="/register"
          element={
            <RouteControl>
              <Register />
            </RouteControl>
          }
        />
        <Route
          path="/login"
          element={
            <RouteControl>
              <Login />
            </RouteControl>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("currentUser2") !== {}) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
