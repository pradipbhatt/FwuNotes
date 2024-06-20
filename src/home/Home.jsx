import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Testimonials/>
      <Freebook />
      <Footer />
    </>
  );
}

export default Home;
