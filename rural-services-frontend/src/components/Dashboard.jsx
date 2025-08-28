// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateUserProfile, getCart } from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, cartData] = await Promise.all([
          getUserProfile(),
          getCart(),
        ]);
        setProfile(userData);
        setCart(cartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (updatedProfile) => {
    try {
      const result = await updateUserProfile(updatedProfile);
      setProfile(result);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>

      <div className="dashboard-sections">
        <section className="profile-section">
          <h2>Your Profile</h2>
          {editMode ? (
            <EditProfileForm
              profile={profile}
              onSave={handleSave}
              onCancel={() => setEditMode(false)}
            />
          ) : (
            <ProfileView profile={profile} onEdit={() => setEditMode(true)} />
          )}
        </section>

        <section className="cart-section">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Price: ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const ProfileView = ({ profile, onEdit }) => {
  return (
    <div className="profile-view">
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Phone:</strong> {profile.phone || "Not provided"}
      </p>
      <button onClick={onEdit}>Edit Profile</button>
    </div>
  );
};

const EditProfileForm = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Dashboard;
