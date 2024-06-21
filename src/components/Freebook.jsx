import React from "react";
import list from "../../public/list.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"; // Import icons
import Cards from "./Cards";

function Freebook() {
  // Define semester categories
  const semesters = [
    "1st Sem",
    // Add more semesters as needed
  ];

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000, // Slide change speed in milliseconds (1 second)
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1000, // Autoplay speed in milliseconds (1 second)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <h2 className="font-bold text-2xl mt-8 mb-4">Free Offered Books</h2>
      <p className="mb-8">
        Explore our collection of free books available for students. These resources cover various subjects and are offered to help you in your studies. Dive into the wealth of knowledge without any cost.
      </p>
      {/* Map through semesters and create a slider for each */}
      {semesters.map((semester, index) => (
        <div key={index} className="semester-slider mt-8">
          {/* Filter books for the current semester */}
          <Slider {...settings}>
            {list
              .filter((item) => item.Category === semester)
              .map((item) => (
                <Cards item={item} key={item.id} />
              ))}
          </Slider>
        </div>
      ))}
      <h2 className="text-xl mt-8 mb-4">
        Get Login and Go to Courses Section to get Complete Notes Resources ⭐❤️
      </h2>
    </div>
  );
}

export default Freebook;
