import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("https://fwu-soe.onrender.com/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-md rounded-lg z-0"></div>
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden w-full relative z-10">
          <div className="md:w-1/2 p-8">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </Link>
              <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">Signup</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your fullname"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white"
                    {...register("fullname", { required: true })}
                  />
                  {errors.fullname && (
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white"
                      {...register("password", { required: true })}
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
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-700 duration-300 cursor-pointer">
                    Signup
                  </button>
                  <p className="text-sm text-gray-600">
                    Have an account?{" "}
                    <button
                      type="button"
                      className="underline text-orange-500 cursor-pointer"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      Login
                    </button>{" "}
                    <Login />
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 bg-orange-100 flex items-center justify-center p-4 md:p-0">
            <img
              src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?t=st=1716895725~exp=1716899325~hmac=67eae84016d344799652cca54be1765ac8e829c437c555a97e5b81deb4e86397&w=740" // Replace with your actual image URL
              alt="Signup Cartoon"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
