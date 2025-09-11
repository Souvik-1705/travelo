
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, updateFamousPlaces } from "../redux/slices/citySlice";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CityDetailsAdmin.css";

function CityDetailsAdmin() {
  const { cityId } = useParams();
  const dispatch = useDispatch();
  const { cities, loading } = useSelector(state => state.city);
  const [famousPlaces, setFamousPlaces] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(fetchCities());
    } else {
      const city = cities.find(c => c.id === cityId);
      setFamousPlaces(city?.famousPlaces || []);
    }
  }, [cities, cityId, dispatch]);

  const handlePlaceChange = (index, field, value) => {
    setFamousPlaces((prevPlaces) => {
    
    const updatedPlaces = [...prevPlaces];

    const updatedPlace = { ...updatedPlaces[index], [field]: value };

    updatedPlaces[index] = updatedPlace;

    return updatedPlaces;
    })
  };

  const addPlace = () => {
    setFamousPlaces([...famousPlaces, { name: "", image: "", description: "" }]);
  };

  const removePlace = (index) => {
    const updatedPlaces = famousPlaces.filter((_, i) => i !== index);
    setFamousPlaces(updatedPlaces);
  };

  const handleSave = () => {
    dispatch(updateFamousPlaces({ cityId, famousPlaces }));
    alert("Famous places updated successfully!");
  };

  if (loading) return <p className="loading-text">Loading city details...</p>;
  if (!cities.find(c => c.id === cityId)) return <p>City not found.</p>;

  return (
    <>
      <AdminNavbar />
      <div className="city-admin-container">
        <h2>Manage Famous Places</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
              &larr; Back
        </button>
        {famousPlaces.map((place, index) => (
          <div key={index} className="place-form-row">
            <input
              type="text"
              placeholder="Place name"
              value={place.name}
              onChange={(e) => handlePlaceChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Place image URL"
              value={place.image}
              onChange={(e) => handlePlaceChange(index, "image", e.target.value)}
            />
            <textarea
              placeholder="Place description"
              value={place.description}
              onChange={(e) => handlePlaceChange(index, "description", e.target.value)}
            />
            <button type="button" onClick={() => removePlace(index)}>Remove</button>
          </div>
        ))}

        <button type="button" onClick={addPlace} className="add-place-btn">Add Place</button>
        <button type="button" onClick={handleSave} className="save-btn">Save Changes</button>
      </div>
    </>
  );
}

export default CityDetailsAdmin;
