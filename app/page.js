import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TestsComponent from "@/components/TestsComponent";
import React from "react";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <TestsComponent />
      <Footer />
    </>
  );
};

export default Home;
