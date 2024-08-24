import React, { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Gallary from "../Gallery"
import Navbar from '../Navbar';

const Image = () => {
  useEffect(() => {
    const translate = document.querySelectorAll(".translate");
    const bigTitle = document.querySelector(".big-title");
    const header = document.querySelector("header");
    const shadow = document.querySelector(".shadow");
    const content = document.querySelector(".content");
    const section = document.querySelector("section");
    const imageContainer = document.querySelector(".imgContainer");
    const opacity = document.querySelectorAll(".opacity");
    const border = document.querySelector(".border");

    let headerHeight = header.offsetHeight;
    let sectionHeight = section.offsetHeight;

    const updateParallax = () => {
      let scroll = window.pageYOffset;
      let sectionY = section.getBoundingClientRect();
      
      translate.forEach(element => {
        let speed = parseFloat(element.dataset.speed);
        element.style.transform = `translateY(${scroll * speed}px) scale(${1 + scroll * 0.00005})`;
      });

      opacity.forEach(element => {
        let maxOpacity = 1;
        element.style.opacity = Math.min(scroll / (sectionY.top + sectionHeight), maxOpacity);
      });

      bigTitle.style.opacity = Math.max(-scroll / (headerHeight / 2) + 1, 0);
      shadow.style.height = `${Math.min(scroll * 0.5 + 300, window.innerHeight)}px`;

      content.style.transform = `translateY(${Math.min(scroll / (sectionHeight + sectionY.top) * 50 - 50, 50)}px)`;
      imageContainer.style.transform = `translateY(${Math.min(scroll / (sectionHeight + sectionY.top) * -50 + 50, 50)}px)`;

      border.style.width = `${Math.min(scroll / (sectionY.top + sectionHeight) * 30, 30)}%`;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      <header className="relative overflow-hidden w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-transparent">
      <Navbar/>

        <h1 className="big-title absolute z-30 text-white font-bold text-4xl md:text-5xl lg:text-6xl text-center top-1/2 transform -translate-y-1/2 leading-tight">
          <Typewriter
            options={{
              strings: ["Learn.", "Discover..", "Explore..."],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </h1>

        <img src="/person.png" className="absolute w-[500px] md:w-[650px] bottom-[-100px] left-[-50px] z-20 translate" data-speed="-0.25" alt="" />
        <img src="/mountain1.png" className="absolute w-[1200px] md:w-[1500px] bottom-[-100px] right-0 z-19 translate" data-speed="-0.2" alt="" />
        <img src="/mountain2.png" className="absolute w-[900px] md:w-[1100px] bottom-[-100px] left-0 z-18 translate" data-speed="0.4" alt="" />
        <img src="/mountain3.png" className="absolute w-[700px] md:w-[900px] bottom-[150px] right-0 z-17 translate" data-speed="0.3" alt="" />
        <img src="/sky.png" className="absolute w-[1800px] md:w-[2100px] bottom-[200px] right-0 translate" data-speed="0.5" alt="" />
      </header>

      <section className="bg-gray-900 relative w-full py-12">
        <div className="shadow absolute bottom-full w-full h-[300px] left-0 z-20 bg-gradient-to-t from-gray-900 to-transparent"></div>

        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-12 mx-auto">
          <div className="content text-white opacity transition-transform duration-500">
            <h3 className="title text-2xl md:text-3xl font-semibold mb-4 relative">
              Our Journey
              <div className="border absolute bottom-0 left-0 h-1 bg-white w-0 transition-all duration-500"></div>
            </h3>
            <div className="text text-sm md:text-base">
              <p className="mb-4">
                <strong>Our Journey Begins:</strong> Our journey began in the first semester of our college in 2020. Initially, we started with a simple HTML and CSS website to support college students by providing necessary notes, tutorials, old question collections, and other resources. We collaborated with our juniors and added them as drive maintainers to share their resources with fellow juniors, creating a learning environment within the college.
              </p>
              <p className="mb-4">
                <strong>2020-2021 Continuous Growth:</strong> During this period, we expanded our website features, adding cloud integration for file storage and management using MongoDB and Cloudinary. We also added more resources and sections for notes, question papers, and mock tests for engineering students.
              </p>
              <p className="mb-4">
                <strong>2021-2022 Future Expansion:</strong> Looking forward, we aim to expand our platform further, introducing new features and resources to support the academic journey of engineering students in our college. We plan to enhance user experience and engagement through continuous improvement and feedback.
              </p>
            </div>
          </div>

          <div className="imgContainer opacity transition-transform duration-500">
            <img src="/image.jpg" className="w-full" alt="" />
          </div>
        </div>
      </section>

     
      {/* <Gallary/> */}
    </div>
  );
};

export default Image;
