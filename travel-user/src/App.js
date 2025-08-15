
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { useDispatch } from "react-redux";
import { logout, verifyToken } from "./redux/slices/authSlice";


const Home = lazy(() => import("./pages/Home"));
const CategoryListings = lazy(() => import("./pages/CategoryListings"));
const ListingDetail = lazy(() => import("./pages/ListingDetail"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  const dispatch=useDispatch();
  const token=localStorage.getItem("token");

  useEffect(()=>{
    if(token){
      dispatch(verifyToken(token));
    }
    else{
      dispatch(logout())
    }
  },[dispatch,token]);
  return (
    <Router>
      <Header />
      <main className="main-container">
        <Suspense fallback={<p style={{ padding: "1rem" }}>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/category/:id"
              element={
                <ProtectedRoute>
                  <CategoryListings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listing/:id"
              element={
                <ProtectedRoute>
                  <ListingDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
