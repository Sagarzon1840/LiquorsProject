import Carousel from "@/components/carousel/Carousel";

import BannerProducts from "@/components/bannerProductHome/banner";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Landing() {
  return (
    <div>
      <Carousel></Carousel>
      <div className="flex flex-col bg-greyMLfilter scroll-smooth overflow-auto pt-10 items-center">
        {/*SECCION UNO DE TARJETAS */}
        <h1 className="text-center text-2xl text-black font-plus-jakarta-sans font-normal mb-4">
          Explore our <b className="text-wine">wine</b> categories
        </h1>
        <ExpandMoreIcon className="flex items-center" />
        <div className="flex space-x-4">
          <BannerProducts />
        </div>

        {/*SECCION DOS DE TARJETAS */}
        <div className="w-full bg-black">
          <h1 className="text-center font-plus-jakarta-sans text-2xl mt-6 text-white font-normal mb-4 relative z-10">
            Only <b className="text-gin">Gin's</b>
          </h1>
        </div>
        <ExpandMoreIcon className="flex items-center mt-6" />
        <div className="flex space-x-4">
          <BannerProducts />
        </div>
      </div>
    </div>
  );
}
