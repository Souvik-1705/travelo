import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addListing } from "../../redux/slices/listingSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import AdminNavbar from "../../components/AdminNavbar";
import "../../styles/AddListing.css";

function AddListing() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    placeName: "",
    pricePerNight: "",
    city: "",
    pin: "",
    address: "",
    description: "",
    categoryId: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploaded = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file);
      if (url) uploaded.push(url);
    }

    setImages(uploaded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      images,
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
    });
    setImages([]);
  };

  return (
    <>
    <AdminNavbar/>
    <form onSubmit={handleSubmit} className="listing-form">
      <h3>Add New Listing</h3>
      <input name="placeName" placeholder="Place Name" onChange={handleChange} value={formData.placeName} /><br />
      <input name="pricePerNight" placeholder="Price" onChange={handleChange} value={formData.pricePerNight} /><br />
      <input name="city" placeholder="City" onChange={handleChange} value={formData.city} /><br />
      <input name="pin" placeholder="PIN Code" onChange={handleChange} value={formData.pin} /><br />
      <input name="address" placeholder="Full Address" onChange={handleChange} value={formData.address} /><br />
      <textarea name="description" placeholder="Description" onChange={handleChange} value={formData.description}></textarea><br />
      <select name="categoryId" onChange={handleChange} value={formData.categoryId}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option value={cat.id} key={cat.id}>{cat.name}</option>
        ))}
      </select><br />
      <input type="file" multiple onChange={handleFileUpload} />
      {images.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
        <p>Uploaded Images:</p>
        {images.map((url, i) => (
      <img key={i} src={url} alt={`Uploaded ${i}`} style={{ width: "100px", marginRight: "5px" }} />
        ))}
        </div>
        )}
      <br />
      <button type="submit">Add Listing</button>
    </form>
    </>
  );
}

export default AddListing;
