import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
// import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
// import Dean from "../components/Dean"
import Gallary from "../components/Gallery";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Gallary/>
      {/* <Dean/> */}
      <Testimonials/>
      {/* <Freebook /> */}
      <Footer />
    </>
  );
}

export default Home;
