import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when signup starts
    try {
      toast.loading("Signing up, please wait..."); // Display loading toast
      const userInfo = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      };
      const res = await axios.post("https://fwu-soe.onrender.com/user/signup", userInfo);
      console.log(res.data);
      if (res.data) {
        toast.success("Successfully signed up");
        navigate("/"); // Redirect to homepage
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      }
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
      toast.dismiss(); // Hide any active toasts
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-box bg-white p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md mx-2">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="w-full">
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </Link>
          <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">Signup using .cse@fwu.edu.np</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white"
                {...register("fullname", { required: "Name is required" })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-500">{errors.fullname.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email @fwu.edu.np"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@fwu\.edu\.np$/,
                    message: "Enter a valid email with @fwu.edu.np domain"
                  }
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition duration-300"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Signing up..." : "Signup"}
              </button>
              <p className="text-sm text-gray-600">
                Have an account?{" "}
                <Link
                  to="/"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Preloader Modal */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <div className="border-4 border-orange-500 border-t-transparent border-solid rounded-full w-8 h-8 animate-spin" role="status">
              <span className="sr-only">Signing up...</span>
            </div>
            <p className="mt-4 text-lg text-gray-800">Signing up, please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
