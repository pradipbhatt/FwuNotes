import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizResultForm from '../components/mock/QuizResultForm';
import Quiz from "../../src/components/mock/Quiz";
import Addbook from "../pages/Addbook";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    registrationNumber: '',
    password: '',
    isAdmin: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://fwu-soe.onrender.com/admin/users', {
        headers: {
          'Content-Type': 'application/json',
          'Is-Admin': 'true'
        },
      });
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
      toast.error('Error fetching users');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fwu-soe.onrender.com/admin/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Is-Admin': 'true'
        },
      });
      fetchUsers();
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
      toast.error('Error deleting user');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://fwu-soe.onrender.com/admin/updateUser/${id}`, form, {
        headers: {
          'Content-Type': 'application/json',
          'Is-Admin': 'true'
        },
      });
      fetchUsers();
      setSelectedUser(null);
      setForm({
        fullname: '',
        email: '',
        registrationNumber: '',
        password: '',
        isAdmin: false,
      });
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
      toast.error('Error updating user');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user._id);
    setForm({
      fullname: user.fullname,
      email: user.email,
      registrationNumber: user.registrationNumber,
      isAdmin: user.isAdmin,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmitNewUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://fwu-soe.onrender.com/user/signup', form, {
        headers: {
          'Content-Type': 'application/json',
          'Is-Admin': 'true'
        },
      });
      fetchUsers();
      setForm({
        fullname: '',
        email: '',
        registrationNumber: '',
        password: '',
        isAdmin: false,
      });
      toast.success('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      toast.error('Error creating user');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Registration Number</th>
                <th className="py-2 px-4 border-b">Admin</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user.fullname}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.registrationNumber}</td>
                  <td className="py-2 px-4 border-b">{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedUser);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Admin</label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={form.isAdmin}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                <span className="text-gray-700">Is Admin</span>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update User
              </button>
            </form>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Add New User</h2>
          <form onSubmit={handleSubmitNewUser}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Registration Number</label>
              <input
                type="text"
                name="registrationNumber"
                value={form.registrationNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Admin</label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={form.isAdmin}
                onChange={handleChange}
                className="mr-2 leading-tight"
              />
              <span className="text-gray-700">Is Admin</span>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
      <QuizResultForm/>
      <Quiz/>
      <Footer />
      <ToastContainer />
      <Addbook/>
    </>
  );
};

export default AdminDashboard;
