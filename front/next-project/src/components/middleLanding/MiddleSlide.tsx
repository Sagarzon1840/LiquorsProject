import React from "react";

const MiddleSlide = () => {
  return (
    <div className="relative  overflow-hidden">
      <div className="h-full overflow-hidden">
        <img
          src="/winesBanner.webp"
          alt=""
          className="absolute object-cover w-full h-full"
        />
      </div>
      <div className="relative z-10 h-1/2 p-4">
        <h2 className="text-2xl font-bold">Componente MiddleSlide</h2>
        <p className="mt-2">Este sería el párrafo de texto de MiddleSlide</p>
      </div>
    </div>
  );
};

export default MiddleSlide;
