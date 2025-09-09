import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, updateListing } from "../../redux/slices/listingSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "../../styles/EditListing.css";

function EditListing() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listings } = useSelector((state) => state.listing);
  const { categories } = useSelector((state) => state.category);
  const [formData, setFormData] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchListings());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (listings.length > 0) {
      const existing = listings.find((l) => l.id === id);
      if (existing) setFormData(existing);
    }
  }, [listings, id]);

  if (!formData) return <p>Loading listing...</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateListing(formData));
    navigate("/admin/listings");
  };


  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddImageByLink = () => {
  if (newImageUrl.trim() !== "") {
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), newImageUrl],
    }));
    setNewImageUrl("");
  }
};
  return (
    <>
      <AdminNavbar />
      <form onSubmit={handleSubmit} className="edit-form">
        <h3>Edit Listing</h3>
        <input
          name="placeName"
          value={formData.placeName}
          onChange={handleChange}
          placeholder="Place Name"
        /><br />
        <input
          name="pricePerNight"
          value={formData.pricePerNight}
          onChange={handleChange}
          placeholder="Price Per Night"
        /><br />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        /><br />
        <input
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          placeholder="PIN Code"
        /><br />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full Address"
        /><br />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        /><br />

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select><br />

        <label className="checkbox-label">
          Available:{" "}
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </label>
        <br />
            <div className="image-section">
          <h4>Images</h4>
          <div className="image-preview-container">
            {formData.images?.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={img} alt={`Preview ${index}`} />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="remove-btn"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
          <div className="add-by-link">
            <input
              type="text"
              placeholder="Paste image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
            <button type="button" onClick={handleAddImageByLink}>
              Add Image
            </button>
          </div>
        </div>

        <button type="submit">Update Listing</button>
      </form>
    </>
  );
}

export default EditListing;
