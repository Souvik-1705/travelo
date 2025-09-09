import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection.js/HeroSection";
import FeaturedListings from "../components/FeaturedListings/FeaturedListings";
import Testimonials from "../components/TestimonialsSection/TestimonialsSection";
import Newsletter from "../components/Newsletter/Newsletter";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../redux/slices/categorySlice";


function Home() {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(fetchCategories())
  },[dispatch]);
  
  return (
    <div>
      <HeroSection/>
      <FeaturedListings/>
      <Testimonials/>
      <Newsletter/>
    </div>
  );
}

export default Home;
