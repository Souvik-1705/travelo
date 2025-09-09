import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import listingReducer from "./slices/listingSlice";
import bookingReducer from "./slices/bookingSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    listing: listingReducer,
    booking: bookingReducer,
    auth:authReducer,
  },
});

export default store;
