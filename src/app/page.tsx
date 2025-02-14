"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Insights } from "@/components/landing/insights";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  // Detectar el scroll y mostrar el botón de "Subir"
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Insights />
      <Footer />

      {/* Botón de "Subir" */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
          aria-label="Subir"
        >
          ↑
        </button>
      )}
    </div>
  );
}
