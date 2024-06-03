import React from "react";
import Link from "next/link";

const MiddleLanding2 = () => {
  return (
    <div className="flex h-1/2 opacity-90 ">
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <img src="/blackLabel.png" alt="whiskeyComponent" className="h-4/5" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Componente MiddleLanding 2</h2>
          <p className="mt-4 text-lg">
            Este es un componente con texto a la izquierda y una imagen a la
            derecha.
          </p>
          <div className="mt-6">
            <Link href="/login">
              <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200">
                Ir a X
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleLanding2;
