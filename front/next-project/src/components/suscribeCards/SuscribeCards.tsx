import React from "react";
import SuscribeCard from "./SuscribeCard";
const SuscribeCards = () => {
  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold text-center mb-6">
        Planes de Suscripción, (maqueta)
      </h2>
      <div className="flex flex-row justify-around items-center">
        <SuscribeCard />
        <SuscribeCard />
        <SuscribeCard />
      </div>
    </div>
  );
};

export default SuscribeCards;
