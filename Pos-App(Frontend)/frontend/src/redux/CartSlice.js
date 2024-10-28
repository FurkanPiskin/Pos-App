/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    total: JSON.parse(localStorage.getItem("total")) || 0,
    price: 0,
    tax: 8,
  },
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (findCartItem) {
        findCartItem.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
     
      state.total += action.payload.price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("total",JSON.stringify(state.total));
    },
    deleteCart: (state, action) => {
      /*  const findCartItem = state.cartItems.filter(
        (item) => item.productId === action.payload.productId
      );*/
      state.total = state.total - (action.payload.price*action.payload.quantity);
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("total",JSON.stringify(state.total));
    },
    increase: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      findCartItem.quantity = findCartItem.quantity + 1;
      state.total += findCartItem.price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("total",JSON.stringify(state.total));
    },
    decrease: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      findCartItem.quantity = findCartItem.quantity - 1;
      state.total -= findCartItem.price;
      if (findCartItem.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId != action.payload.productId
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("total",JSON.stringify(state.total));
    },
    
    clearAllCarts: (state, action) => {
      state.cartItems = [];
      state.total = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("total", 0);
    },
  },
});

export const { addProduct, deleteCart, increase, decrease, clearAllCarts } =
  cartSlice.actions;
export default cartSlice.reducer;

/*addProduct: (state, action) => {
      const { product, quantity } = action.payload;
      // product ve quantity'yi ayrı ayrı işle
      state.cartItems.push({
        ...product, // Ürün bilgilerini ekliyoruz
        quantity: quantity || 1, // Miktarı da ekliyoruz, yoksa varsayılan olarak 1
      });
    },*/
