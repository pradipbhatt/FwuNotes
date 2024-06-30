import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ fullname: "", email: "", registrationNumber: "", password: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://fwu-soe.onrender.com/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(res.data);
      setUserCount(res.data.length);
    } catch (error) {
      toast.error("Error: " + (error.response ? error.response.data.message : error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fwu-soe.onrender.com/user/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Error: " + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://fwu-soe.onrender.com/user/signup", newUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("User created successfully");
      setNewUser({ fullname: "", email: "", registrationNumber: "", password: "" });
      fetchUsers();
    } catch (error) {
      toast.error("Error: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <span className="text-lg">Total Users: {userCount}</span>
      </div>
      <form onSubmit={handleCreate} className="mb-4">
        <input
          type="text"
          placeholder="Full Name"
          value={newUser.fullname}
          onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
          required
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Registration Number"
          value={newUser.registrationNumber}
          onChange={(e) => setNewUser({ ...newUser, registrationNumber: e.target.value })}
          required
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
          className="border p-2 rounded mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create User</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Full Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Registration Number</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-2 px-4">{user.fullname}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.registrationNumber}</td>
                <td className="py-2 px-4">{user.isAdmin ? "Admin" : "User"}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
