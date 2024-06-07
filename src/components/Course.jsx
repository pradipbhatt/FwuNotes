import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import list from "../../public/list.json";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [coursesBySemester, setCoursesBySemester] = useState({});

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("https://fwu-soe.onrender.com/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  useEffect(() => {
    const groupedCourses = list.reduce((acc, course) => {
      const semester = course.semester || "Notes Based on Semester";
      if (!acc[semester]) {
        acc[semester] = [];
      }
      acc[semester].push(course);
      return acc;
    }, {});
    setCoursesBySemester(groupedCourses);
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-orange-500"> Here! :</span>
          </h1>
          <p className="mt-12">
            Thank you for being here! Here you'll find details about various
            courses for your study. These courses provide education on different
            subjects and are available to assist you in your studies. Some books
            may have limited availability, so make sure to get them in time. For
            more information, visit our website.
          </p>
          <Link to="/">
            <button className="mt-6 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        {/* Courses by Semester */}
        <div className="mt-12">
          {Object.keys(coursesBySemester).map((semester) => (
            <div key={semester} className="mb-12">
              <h2 className="text-xl font-bold mb-4">{semester}</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {coursesBySemester[semester].map((item) => (
                  <Cards key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
