import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addListing } from "../../redux/slices/listingSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import AdminNavbar from "../../components/AdminNavbar";
import "../../styles/AddListing.css";
import { fetchCities } from "../../redux/slices/citySlice";

function AddListing() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const {cities}=useSelector((state)=>state.city);
  const [formData, setFormData] = useState({
    placeName: "",
    pricePerNight: "",
    city: "",
    pin: "",
    address: "",
    description: "",
    categoryId: "",
    images:[],
  });

  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
  if (!cities.length) {
    dispatch(fetchCities());
  }
}, [dispatch, cities.length]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddImageByLink = () => {
    if (newImageUrl.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      availability: true,
      createdAt: new Date().toISOString(),
    };
    dispatch(addListing(payload));
    alert("Listing Added");
    setFormData({
      placeName: "",
      pricePerNight: "",
      city: "",
      pin: "",
      address: "",
      description: "",
      categoryId: "",
      images:[],
    });
    setNewImageUrl("");
  };

  return (
    <>
    <AdminNavbar/>
    <form onSubmit={handleSubmit} className="listing-form">
      <h3>Add New Listing</h3>
      <input name="placeName" placeholder="Place Name" onChange={handleChange} value={formData.placeName} /><br />
      <input name="pricePerNight" placeholder="Price" onChange={handleChange} value={formData.pricePerNight} /><br />
      <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select><br />
      <input name="pin" placeholder="PIN Code" onChange={handleChange} value={formData.pin} /><br />
      <input name="address" placeholder="Full Address" onChange={handleChange} value={formData.address} /><br />
      <textarea name="description" placeholder="Description" onChange={handleChange} value={formData.description}></textarea><br />
      <select name="categoryId" onChange={handleChange} value={formData.categoryId}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option value={cat.id} key={cat.id}>{cat.name}</option>
        ))}
      </select><br />

      <div className="image-section">
          <h4>Images</h4>
          <div className="image-preview-container">
            {formData.images.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={img} alt={`Preview ${index}`} style={{ width: "100px",marginRight: "5px" }} />
                <button type="button" onClick={() => handleRemoveImage(index)}>❌</button>
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
      <br />
      <button type="submit">Add Listing</button>
    </form>
    </>
  );
}

export default AddListing;
