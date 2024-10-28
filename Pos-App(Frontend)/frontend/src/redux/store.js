import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./CartSlice.js"

export default configureStore({
    reducer:{
        cart:cartSlice,
    }
})