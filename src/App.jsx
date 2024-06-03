import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Mock from "./components/Mock";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Mock1 from "./components/Mock1";
import Mock2 from "./components/Mock2";
import Mock3 from "./components/Mock3";
import Mock4 from "./components/Mock4";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/Mock" element={<Mock />} />

          <Route path="/Mock1" element={<Mock1 />} />

          <Route path="/Mock2" element={<Mock2 />} />

          <Route path="/Mock3" element={<Mock3 />} />

          <Route path="/Mock4" element={<Mock4 />} />

          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
