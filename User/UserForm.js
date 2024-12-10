import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", formData, {
        headers: { Authorization: Bearer ${localStorage.getItem("token")} },
      });
      fetchUsers();
    } catch (error) {
      alert("Operation Failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <select name="role" onChange={handleChange} required>
        <option value="Student">Student</option>
        <option value="Teacher">Teacher</option>
        <option value="Institute">Institute</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;