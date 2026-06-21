import React from "react";
import Navbar from "../Navbar";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import Chat from "../AI/Chat";
import BooksBrowser from "../books/BooksBrowser";

function Home() {
  return (
    <>
      <Navbar />
      <BooksBrowser faculty="Computer" routeBase="/showbook" />
      <Testimonials />
      <Chat />
      <Footer />
    </>
  );
}

export default Home;
