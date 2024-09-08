import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await axios.post("https://fwu-soe.vercel.app/user/login", userInfo);
      if (res.data) {
        toast.success("Logged in Successfully");
        document.getElementById("my_modal_3").close();
        setTimeout(() => {
          window.location.reload();
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box p-8 rounded-lg shadow-xl bg-white dark:bg-gray-900">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-300"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Login using College Mail
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email @fwu.edu.np"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 mt-1 block">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300"
                  >
                   {showPassword ? (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM12 10a2 2 0 110 4 2 2 0 010-4zM2 12c1.666-3.334 5.018-6 10-6s8.334 2.666 10 6c-1.666 3.334-5.018 6-10 6s-8.334-2.666-10-6z"></path>
  </svg>
) : (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3 3 3 0 01-3 3zM21 12c-1.666-3.334-5.018-6-10-6s-8.334 2.666-10 6c1.666 3.334 5.018 6 10 6s8.334-2.666 10-6zM4.293 4.293a1 1 0 00-1.415 1.415L6.586 8.707C6.061 9.295 5.662 9.913 5.344 10.617l-1.897 1.897A2.978 2.978 0 013 12c1.666-3.334 5.018-6 10-6 1.752 0 3.422.359 4.993.976l2.052-2.052a1 1 0 00-1.415-1.415L4.293 4.293zM3 12c0-1.406.335-2.732.928-3.91L12 16.098V20c0 .659.21 1.288.572 1.788L15.29 16.578A2.97 2.97 0 0113 12c-1.137 0-2.2.484-2.945 1.256l-4.006 4.006C4.413 16.296 3 14.23 3 12z"></path>
  </svg>
)}

                  </button>
                </div>
                {errors.password && (
                  <span className="text-sm text-red-500 mt-1 block">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300 disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Not registered?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-500 dark:text-blue-400 underline hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-300"
                  >
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </dialog>

      {/* Preloader Modal */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-80 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="spinner-border animate-spin w-10 h-10 border-4 rounded-full border-blue-500 dark:border-orange-500" role="status">
              <span className="sr-only">Logging in...</span>
            </div>
            <p className="mt-4 text-lg text-gray-800 dark:text-gray-100">Logging in, please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
