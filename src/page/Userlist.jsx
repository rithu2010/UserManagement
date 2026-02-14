import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Modal from "../components/Model";
import Table from "../components/Table";
import "./Userlist.css";

const API_URL = "http://localhost:8080/api/users";

const UserList = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const [editId, setEditId] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      if (editId !== null) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
      }
      else {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
      }

      fetchUsers();
      setFormData({
        name: "",
        email: ""
      });
      setEditId(null);
      setShowModal(false);

    }
    catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      fetchUsers();
    }
    catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email
    });
    setEditId(user.id);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({
      name: "",
      email: ""
    });
    setEditId(null);
  };

  return (
    <div className="user-container">
      <div className="user-card">
        {/* Header */}
        <div className="user-header">
          <h2>User List</h2>
          <Button
            label="+ Add User"
            className="add-btn"
            onClick={() => setShowModal(true)}
          />
        </div>
        {/* Table */}
        <Table
          data={users}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        {/* Modal */}
        <Modal show={showModal}>
          <h3>
            {editId !== null ? "Edit User" : "Add User"}
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="modal-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="modal-input"
          />

          <div className="modal-buttons">
            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;