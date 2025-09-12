
import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import CityDetailsAdmin from "./pages/CityDetailsAdmin";



const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Categories = lazy(() => import("./features/categories/Categories"));
const Listings = lazy(() => import("./features/listings/Listings"));
const AddListing = lazy(() => import("./features/listings/AddListing"));
const Cities=lazy(()=>import ("./pages/Cities"));
const EditListing = lazy(() => import("./features/listings/EditListing"));
const Bookings = lazy(() => import("./features/bookings/Bookings"));

function App() {
  const dispatch=useDispatch();
  const token = localStorage.getItem("adminToken");
  const guest = localStorage.getItem("admin_guest") === "true";
  useEffect(() => {
  if (!token && !guest) {
    dispatch(logout());
  }
}, [dispatch, token, guest]);

  return (
    <Suspense fallback={<p style={{ padding: "2rem" }}>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/categories"
          element={<ProtectedRoute><Categories /></ProtectedRoute>}
        />
        <Route
          path="/admin/listings"
          element={<ProtectedRoute><Listings /></ProtectedRoute>}
        />
        <Route
        path="/admin/cities"
        element={<ProtectedRoute><Cities/></ProtectedRoute>}
        />
        <Route
          path="/admin/add-listing"
          element={<ProtectedRoute><AddListing /></ProtectedRoute>}
        />
        <Route 
        path="/admin/city/:cityId"
        element={<ProtectedRoute><CityDetailsAdmin/></ProtectedRoute>}
        >

        </Route>
        <Route
          path="/admin/edit-listing/:id"
          element={<ProtectedRoute><EditListing /></ProtectedRoute>}
        />
        <Route
          path="/admin/bookings"
          element={<ProtectedRoute><Bookings /></ProtectedRoute>}
        />

      </Routes>
    </Suspense>
  );
}

export default App;
