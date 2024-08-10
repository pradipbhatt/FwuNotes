import React from "react";
import Navbar from "../Navbar";
import Banner from "./Banner";
// import Freebook from "../components/Freebook";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
// import Dean from "../components/Dean";
import Gallary from "../Gallery";
import Chat from "../AI/Chat";
import PopupNotice from "./PopupNotice";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      {/* <Gallary/> */}
      {/* <Dean/> */}
      <Testimonials />
      {/* <Freebook /> */}
      <Chat />
      <Footer />
      <PopupNotice />
    </>
  );
}

export default Home;