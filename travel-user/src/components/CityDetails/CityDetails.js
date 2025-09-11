
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CityDetails.css";

const DB_URL = "https://travel-website-2ae60-default-rtdb.firebaseio.com/cities";

function CityDetails() {
  const { cityId } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCity = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${DB_URL}/${cityId}.json`);
        setCity(res.data);
      } catch (error) {
        console.error(error);
        setCity(null);
      }
      setLoading(false);
    };
    fetchCity();
  }, [cityId]);

  if (loading) return <p className="loading">Loading city details...</p>;
  if (!city) return <p className="loading">City not found.</p>;

  return (
    <div className="city-details">
      <div className="city-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
              &larr; Back
          </button>
        {city.image && <img src={city.image} alt={city.name} className="city-banner" />}
        <h1 className="city-title">{city.name}</h1>
        {city.description && <p className="city-description">{city.description}</p>}
      </div>

      <h2 className="section-title">Famous Places in {city.name}</h2>
      {city.famousPlaces && Object.keys(city.famousPlaces).length > 0 ? (
        <div className="famous-places-blog">
          {Object.keys(city.famousPlaces).map((placeId) => {
            const place = city.famousPlaces[placeId];
            return (
              <article key={placeId} className="place-blog-card">
                {place.image && (
                  <img src={place.image} alt={place.name} className="place-blog-img" />
                )}
                <div className="place-blog-content">
                  <h2 className="place-blog-title">{place.name}</h2>
                  <p className="place-blog-desc">{place.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="loading">No famous places listed yet.</p>
      )}
    </div>
  );
}

export default CityDetails;
