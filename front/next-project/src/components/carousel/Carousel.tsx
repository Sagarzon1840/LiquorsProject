"use client";
import React, { useEffect, useState } from "react";
import { arrayCarousel } from "@/utils/arrayCarousel";

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === arrayCarousel.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === arrayCarousel.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? arrayCarousel.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container relative w-full h-96 overflow-hidden ">
      {arrayCarousel.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={prevImage}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={nextImage}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
