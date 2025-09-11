import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";
import AdminNavbar from "../../components/AdminNavbar";
import "../../styles/Categories.css";

function Categories() {
  const dispatch = useDispatch();
  const { categories, loading: catLoading } = useSelector(
    (state) => state.category
  );

  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(""); 

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter category name");
      return;
    }

    const categoryData = { name, image: image || null };

    if (editId) {
      dispatch(updateCategory({ id: editId, ...categoryData }));
      setEditId(null);
    } else {
      dispatch(addCategory(categoryData));
    }

    setName("");
    setImage("");
  };

  const handleEdit = (category) => {
    setName(category.name);
    setImage(category.image || "");
    setEditId(category.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <>
      <AdminNavbar />
      <div style={{ padding: "1rem" }}>
        <h2>Manage Categories</h2>

        <form onSubmit={handleSubmit} className="category-form">
          <input
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Enter category image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit">{editId ? "Update" : "Add"}</button>
        </form>

        {catLoading && <p>Loading...</p>}

        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.id} className="category-row">
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-thumb"
                />
              )}
              <span className="category-name">{cat.name}</span>
              <div className="category-actions">
                <button className="edit-btn" onClick={() => handleEdit(cat)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Categories;
