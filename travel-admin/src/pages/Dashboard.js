// Dashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../components/AdminNavbar";
import { fetchListings } from "../redux/slices/listingSlice";
import { fetchBookings } from "../redux/slices/bookingSlice";
import { fetchCategories } from "../redux/slices/categorySlice";
import "../styles/Dashboard.css";

// Recharts imports
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function Dashboard() {
  const dispatch = useDispatch();
  const { listings } = useSelector((state) => state.listing);
  const { bookings } = useSelector((state) => state.booking);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchListings());
    dispatch(fetchBookings());
    dispatch(fetchCategories());
  }, [dispatch]);

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  // Prepare monthly data for charts
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const monthBookings = bookings.filter(
      (b) => new Date(b.fromDate).getMonth() === i
    );
    const total = monthBookings.reduce((sum, b) => sum + b.totalPrice, 0);
    return {
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      revenue: total,
      bookings: monthBookings.length,
    };
  });

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-container">
        <h2 className="dashboard-heading">Welcome to Admin Dashboard</h2>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>{listings.length}</h3>
            <p>Total Listings</p>
          </div>
          <div className="dashboard-card">
            <h3>{categories.length}</h3>
            <p>Total Categories</p>
          </div>
          <div className="dashboard-card">
            <h3>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>
          <div className="dashboard-card">
            <h3>₹{totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-card">
            <h3>Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4caf50"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Monthly Bookings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
