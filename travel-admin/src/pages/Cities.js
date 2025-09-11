import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCities,
  addCity,
  updateCity,
  deleteCity,
} from "../redux/slices/citySlice";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Cities.css";
import { useNavigate } from "react-router-dom";

function Cities() {
  const dispatch = useDispatch();
  const { cities, loading } = useSelector((state) => state.city);

  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const cityData = { name, image: imageLink || null };

    if (editId) {
      dispatch(updateCity({ id: editId, ...cityData }));
      setEditId(null);
    } else {
      dispatch(addCity(cityData));
    }

    setName("");
    setImageLink("");
  };

  const handleEdit = (city) => {
    setName(city.name);
    setImageLink(city.image || "");
    setEditId(city.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteCity(id));
  };

  return (
    <>
      <AdminNavbar />
      <div className="cities-container">
        <h2 className="cities-title">Manage Cities</h2>

        <form onSubmit={handleSubmit} className="city-form">
          <input
            type="text"
            className="city-input"
            placeholder="Enter city name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="city-input"
            placeholder="Enter city image URL"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <button type="submit" className="city-submit-btn">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {loading && <p className="loading-text">Loading cities...</p>}

        <ul className="city-list">
          {cities.length === 0 && !loading && (
            <p className="no-cities">No cities found. Add a city above.</p>
          )}
          {cities.map((city) => (
            <li key={city.id} className="city-row">
              {city.image && (
                <img src={city.image} alt={city.name} className="city-thumb" />
              )}
              <span className="city-name">{city.name}</span>
              <div className="city-actions">
                <button
                  className="btn edit-btn"
                  onClick={() => handleEdit(city)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDelete(city.id)}
                >
                  Delete
                </button>
                <button
                className="btn manage-btn"
                onClick={() => navigate(`/admin/city/${city.id}`)}
                >
                Manage Famous Places
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Cities;
