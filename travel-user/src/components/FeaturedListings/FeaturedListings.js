import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../../redux/slices/listingSlice";
import "./FeaturedListings.css";
import { useNavigate } from "react-router-dom";

function FeaturedListings() {
  const dispatch = useDispatch();
  const { listings, loading } = useSelector((state) => state.listing);
  const navigate=useNavigate();

  useEffect(() => {
    if(listings.length === 0) dispatch(fetchListings());
  }, [dispatch, listings.length]);

  const featured = listings.slice(0, 6); 

  const handleClick = (id) => {
    navigate(`/listing/${id}`);
  };

  if (loading) return <p style={{ padding: "1rem" }}>Loading featured stays...</p>;

  return (
    <section className="featured-section">
      <h2>🌟 Featured Stays</h2>
      <div className="featured-grid">
        {featured.map((l) => (
          <div className="featured-card" key={l.id} onClick={()=>handleClick(l.id)}>
            {l.images?.[0] && <img src={l.images[0]} alt={l.placeName} />}
            <div className="featured-info">
              <h4>{l.placeName}</h4>
              <p>₹{l.pricePerNight}/night</p>
              <p>{l.city}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedListings;
