import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <>
      <AdminNavbar />
      <h2 className="dashboard-heading">Welcome to Admin Dashboard</h2>
    </>
  );
}

export default Dashboard;
