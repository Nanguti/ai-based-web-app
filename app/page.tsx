"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Achievements from "./components/Achievements";
import News from "./components/News";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <News />
      <Footer />
    </main>
  );
}
