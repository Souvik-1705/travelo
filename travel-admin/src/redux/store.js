import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import listingReducer from "./slices/listingSlice";
import bookingReducer from "./slices/bookingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    listing: listingReducer,
    booking: bookingReducer,
  },
});

export default store;
