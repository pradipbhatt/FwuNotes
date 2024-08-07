import React from "react";
import Navbar from "../components/Navbar";
import Course from "../components/notes/Course";
import Footer from "../components/home/Footer";
function Courses() {
  // console.log(list);
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Course />
      </div>
      <Footer />
    </>
  );
}

export default Courses;
