
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { useDispatch } from "react-redux";
import { logout, verifyToken } from "./redux/slices/authSlice";
import Chatbot from "./components/Chatbot/Chatbot";



const Home = lazy(() => import("./pages/Home"));
const CategoryPage= lazy(()=> import("./pages/CategoryPage/CategoryPage"));
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
    <div>
    <Router>
      <Header />
      <main>
        <Suspense fallback={<p style={{ padding: "1rem" }}>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<CategoryPage/>}/>
            <Route path="/category/:id" element={<CategoryListings />} />
            <Route path="/listing/:id"element={<ProtectedRoute><ListingDetail /></ProtectedRoute>}/>
            <Route path="/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </main>
      <Chatbot/>
    </Router>
    </div>
  );
}

export default App;
