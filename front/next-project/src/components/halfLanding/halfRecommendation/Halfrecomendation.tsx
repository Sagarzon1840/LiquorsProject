"use client";
import { IRecommendation } from "@/interfaces/interfaz";
import React, { useState, useEffect } from "react";

const HalfRecommendation = ({
  recommendation,
}: {
  recommendation: IRecommendation;
}) => {
  const { title, imageB, imageF, imageP, description, color, link } =
    recommendation;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`relative w-1/3 h-full flex flex-col items-center justify-center overflow-hidden mt-20`}
    >
      <img
        src={imageB}
        alt=""
        className="absolute object-cover w-full h-[105%] z-0 opacity-95   "
        style={{ transform: `translateY(-${scrollY * 0.1}px)` }}
      />
      <img
        src={imageP}
        alt=""
        className="absolute object-cover w-full h-[105%] z-0 opacity-95   "
        style={{ transform: `translateY(-${scrollY * 0.2}px)` }}
      />
      <img
        src={imageF}
        alt=""
        className="absolute object-cover w-full h-[105%] z-0 opacity-95   "
        style={{ transform: `translateY(-${scrollY * 0.5}px)` }}
      />
      <div className="relative z-10 text-base">
        <h1
          className="text-4xl mb-96 font-bold text-center"
          style={{ color: color }}
        >
          {title}
        </h1>
        <p className="mt-8 text-lg  text-center" style={{ color: color }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default HalfRecommendation;
