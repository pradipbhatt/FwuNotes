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
import DownloadButton from "./DownloadButton"; // Import your download button
import BooksUploaded from "../../pages/BooksUploaded";
function Home() {
  return (
    <>
      <Navbar />
      {/* <Banner /> */}
      {/* <Gallary/> */}
      {/* <Dean/> */}
      <BooksUploaded/>
      <Testimonials />
      
      {/* <Freebook /> */}
      <Chat />
      <Footer />
      {/* <PopupNotice /> */}
      {/* <DownloadButton/> */}
    </>
  );
}

export default Home;
