import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizResultForm from '../components/mock/QuizResultForm';
import Quiz from '../components/mock/Quiz';
import AddBook from './Addbook';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    registrationNumber: '',
    password: '',
    isAdmin: false,
    userImage: '' // Added field for user image
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://fwu-soe.vercel.app/admin/users', {
        headers: {
          'Content-Type': 'application/json',
          'Is-Admin': 'true',
        },
      });
      // Assuming `lastModified` is a string in ISO 8601 format (e.g., '2024-07-30T12:34:56Z')
      const sortedUsers = response.data.sort((a, b) =>
        new Date(b.lastModified) - new Date(a.lastModified)
      );
      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
      toast.error('Error fetching users');
    }
  };
  

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://fwu-soe.vercel.app/admin/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Is-Admin': 'true',
        },
      });
      fetchUsers();
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
      toast.error('Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      // Only include the password if it is not empty
      const updateData = {
        fullname: form.fullname,
        email: form.email,
        registrationNumber: form.registrationNumber,
        isAdmin: form.isAdmin,
        userImage: form.userImage,
      };
      if (form.password) {
        updateData.password = form.password;
      }
      await axios.put(`https://fwu-soe.vercel.app/user/users/${id}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
          'Is-Admin': 'true',
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
        userImage: '' // Reset userImage
      });
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
      toast.error('Error updating user');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user._id);
    setForm({
      fullname: user.fullname,
      email: user.email,
      registrationNumber: user.registrationNumber,
      isAdmin: user.isAdmin,
     
      userImage: user.userImage || '', // Populate userImage
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
    setLoading(true);
    try {
      await axios.post('https://fwu-soe.vercel.app/user/signup', form, {
        headers: {
          'Content-Type': 'application/json',
          'Is-Admin': 'true',
        },
      });
      fetchUsers();
      setForm({
        fullname: '',
        email: '',
        registrationNumber: '',
        password: '',
        isAdmin: false,
       
        userImage: '' // Reset userImage
      });
      toast.success('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      toast.error('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6 mt-20 bg-gray-800 dark:bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-100 dark:text-gray-900">Admin Dashboard</h1>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white dark:bg-gray-100 border border-gray-100 dark:border-gray-100 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-700 dark:bg-gray-800 text-gray-100 dark:text-gray-100">
                <th className="py-3 px-4 border-b">Full Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Registration Number</th>
                <th className="py-3 px-4 border-b">Admin</th>
              
                <th className="py-3 px-4 border-b">User Image</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="transition-transform duration-300 transform hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 border-b text-gray-700 dark:text-gray-500">{user.fullname}</td>
                  <td className="py-3 px-4 border-b text-gray-700 dark:text-gray-500">{user.email}</td>
                  <td className="py-3 px-4 border-b text-gray-700 dark:text-gray-500">{user.registrationNumber}</td>
                  <td className="py-3 px-4 border-b text-gray-700 dark:text-gray-500">{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-4 border-b">
                    {user.userImage ? (
                      <img
                        src={user.userImage}
                        alt={user.fullname}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      disabled={loading}
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
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-500">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedUser);
              }}
            >
              <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-400">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-400">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-400">Registration Number</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-400">Password (optional)</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-blue-800 hover:underline mt-1"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-400">Is Admin</label>
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={form.isAdmin}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-400">User Image URL</label>
                  <input
                    type="text"
                    name="userImage"
                    value={form.userImage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                disabled={loading}
              >
                Update User
              </button>
            </form>
          </div>
        )}

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-500">Add New User</h2>
          <form onSubmit={handleSubmitNewUser}>
            <div className="grid gap-4 mb-4 md:grid-cols-2">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-400">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-400">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-400">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-blue-500 hover:underline mt-1"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-400">Is Admin</label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={form.isAdmin}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-400">User Image URL</label>
                <input
                  type="text"
                  name="userImage"
                  value={form.userImage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-100 dark:text-gray-100"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              disabled={loading}
            >
              Add User
            </button>
          </form>
        </div>
      </div>
   <QuizResultForm/>
    <Quiz/>
     <AddBook/>
      <ToastContainer />

    </>
  );
};

export default AdminDashboard;
