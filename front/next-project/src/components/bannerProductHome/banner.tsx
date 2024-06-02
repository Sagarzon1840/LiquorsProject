"use client";
import React, { useRef, useState } from "react";
import MapProductCard from "../mapProductCard/mapProductCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Product } from "@/interfaces/interfaz";

const BannerProducts: React.FC = () => {

  const scrollContainer = useRef<HTMLDivElement>(null);

  //Función para hacer scroll hacia la izquierda con animación
  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.classList.add("slide-left");
      scrollContainer.current.scrollLeft -= 200;
      // Eliminar la clase de animación después de que termine la animación
      scrollContainer.current.addEventListener(
        "animationend",
        () => {
          scrollContainer.current?.classList.remove("slide-left");
        },
        { once: true }
      ); // El evento se escuchará solo una vez
    }
  };

  //Función para hacer scroll hacia la derecha con animación
  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.classList.add("slide-right");
      scrollContainer.current.scrollLeft += 200;
      // Eliminar la clase de animación después de que termine la animación
      scrollContainer.current.addEventListener(
        "animationend",
        () => {
          scrollContainer.current?.classList.remove("slide-right");
        },
        { once: true }
      ); // El evento se escuchará solo una vez
    }
  };

  return (
    <div className="relative flex justify-center flex-col pt-7 pb-4 bg-grey5 w-3/4 max-w-screen-lg mx-auto">
      <div className="flex justify-center items-center relative w-full">
        {/* FLECHA IZQUIERDA */}
        <button onClick={scrollLeft} className="absolute left-0 p-2 z-10">
          <ArrowBackIosIcon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Contenedor de tarjetas */}
        <div ref={scrollContainer} className="flex overflow-hidden w-full">
          <div className="flex space-x-4">
            <MapProductCard />
          </div>
        </div>

        {/* FLECHA DERECHA */}
        <button onClick={scrollRight} className="absolute right-0 p-2 z-10">
          <ArrowForwardIosIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>
      <section className="flex justify-start text-white mt-4">
        <span>More wine categories</span>
        <button></button>
      </section>
    </div>
  );
};

export default BannerProducts;
