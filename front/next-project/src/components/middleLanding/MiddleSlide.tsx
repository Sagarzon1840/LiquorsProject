import React from "react";

const MiddleSlide = () => {
  return (
    <div className="relative h-[40vh] overflow-hidden opacity-90">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/winesBanner.webp"
          alt=""
          className="absolute object-cover w-full h-full"
        />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center bg-opacity-70 p-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Componente MiddleSlide (lo estoy laburando)
          </h2>
          <p className="mt-2 text-lg">
            Este sería el párrafo de texto de MiddleSlide
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiddleSlide;
