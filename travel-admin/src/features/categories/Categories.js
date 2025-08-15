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
  const { categories, loading } = useSelector((state) => state.category);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateCategory({ id: editId, name }));
      setEditId(null);
    } else {
      dispatch(addCategory(name));
    }
    setName("");
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditId(category.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <>
    <AdminNavbar/>
    <div style={{ padding: "1rem" }}>
      <h2>Manage Categories</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <input
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      {loading && <p>Loading...</p>}
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}{" "}
            <button onClick={() => handleEdit(cat)}>Edit</button>{" "}
            <button onClick={() => handleDelete(cat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default Categories;
