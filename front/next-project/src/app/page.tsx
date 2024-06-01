
import BannerProducts from "@/components/bannerProductHome/banner";
import React from "react";


export default function Landing() {

  return (
    <div>
      <div className="flex flex-col scroll-smooth overflow-auto pt-10 items-center">
        {/*SECCION UNO DE TARJETAS */}
        <h1 className="text-center text-2xl text-white font-bold mb-4">
          Explore our wine categories
        </h1>
        <div className="flex space-x-4">
          <BannerProducts />
        </div>
        {/*SECCION DOS DE TARJETAS */}
        <h1 className="text-center text-2xl mt-6 text-white font-bold mb-4">
          Explore our wine categories
        </h1>
        <div className="flex space-x-4">
          <BannerProducts />
        </div>
      </div>
    </div>
  );
}
