import React from "react";
import Navbar from "../Navbar";
import Banner from "./Banner";
// import Freebook from "../components/Freebook";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
// import Dean from "../components/Dean"
import Gallary from "../Gallery";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      {/* <Gallary/> */}
      {/* <Dean/> */}
      <Testimonials/>
      {/* <Freebook /> */}
      <Footer />
    </>
  );
}

export default Home;
