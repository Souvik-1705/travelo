import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import listingReducer from "./slices/listingSlice";
import bookingReducer from "./slices/bookingSlice";
import cityReducer from "./slices/citySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    listing: listingReducer,
    booking: bookingReducer,
    city:cityReducer,
  },
});

export default store;
