import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userInfo = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        registrationNumber: data.registrationNumber,
        isAdmin: true,
        userImage: userImage || "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png",
      };
      const res = await axios.post("https://fwu-soe.vercel.app/user/signup", userInfo, {
        headers: {
          "Content-Type": "application/json",
          "is-admin": true,
        },
      });
      if (res.data) {
        toast.success("Successfully signed up!", {
          duration: 4000,
        });
        navigate("/");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }
    } catch (err) {
      let message = "An error occurred. Please try again.";
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          if (data.message.includes("email")) {
            message = "This email is already in use. Please use a different email.";
          } else if (data.message.includes("registration number")) {
            message = "This registration number is already in use. Please use a different number.";
          } else {
            message = "Invalid input. Please check your details and try again.";
          }
        } else {
          message = "An unexpected error occurred. Please try again later.";
        }
      } else {
        message = "Network error. Please check your connection and try again.";
      }
      toast.error(message, {
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-100 bg-transparent">
      <div className="modal-box flex flex-col lg:flex-row w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 bg-transparent border-none text-2xl"
        >
          &times;
        </button>

        <div className="lg:w-1/2 hidden lg:block">
          <img
            src={userImage || "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="lg:w-1/2 p-8 flex flex-col justify-center h-auto">
          <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-4 text-center">Signup using College issued mail ID (fwu.edu.np)</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className={`w-full px-4 py-2 border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                  {...register("fullname", { required: "Name is required" })}
                />
                {errors.fullname && <span className="text-sm text-red-500">{errors.fullname.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email @fwu.edu.np"
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@fwu\.edu\.np$/,
                      message: "Enter a valid email with @fwu.edu.np domain"
                    }
                  })}
                />
                {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Registration Number</label>
                <input
                  type="text"
                  placeholder="Enter registration number eg.BCT07733"
                  className={`w-full px-4 py-2 border ${errors.registrationNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                  {...register("registrationNumber", { required: "Registration number is required" })}
                />
                {errors.registrationNumber && <span className="text-sm text-red-500">{errors.registrationNumber.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-600 dark:text-gray-400"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={userImage}
                  onChange={(e) => setUserImage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700"
                />
                {userImage && <img src={userImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center mt-6">
              <button
                type="submit"
                className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Signup"}
              </button>
              <p className="mt-4 lg:mt-0">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-500 hover:text-indigo-700">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
