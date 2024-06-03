import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import list from "../../public/list.json";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);

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

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-purple-500"> Here! :</span>
          </h1>
          <p className="mt-12">
            Thank you for being here! Here you'll find details about various
            courses for your study. These courses provide education on different
            subjects and are available to assist you in your studies. Some books
            may have limited availability, so make sure to get them in time. For
            more information, visit our website.
          </p>
          <Link to="/">
            <button className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        {/* Courses */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {list.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
