import React from "react";

import SquareWineLanding from "@/components/squareLanding/SquareWineLanding";
import SquareWhiskeyLanding from "@/components/squareLanding/SquareWhiskeyLanding";
import HalfLanding from "@/components/halfLanding/HalfLanding";
import SquareSpiritsLanding from "@/components/squareLanding/SquareSpiritsLanding";
import SquareRumLanding from "@/components/squareLanding/SquareRumLanding";
import MiddleLanding2 from "@/components/middleLanding/MiddleLanding2";
import MiddleLanding from "@/components/middleLanding/MiddleLanding";
import MiddleSlide from "@/components/middleLanding/MiddleSlide";
import SuscribeCards from "@/components/suscribeCards/SuscribeCards";

const Home: React.FC = (): React.ReactNode => {
  return (
    <>
      <div>
        <div className="flex flex-row">
          <HalfLanding />
          {/*     <div className="grid grid-cols-2 ">
            <SquareWineLanding />
            <SquareWhiskeyLanding />
            <SquareSpiritsLanding />
            <SquareRumLanding />
          </div> */}
        </div>
        <div>
          <MiddleLanding2 />
          <MiddleLanding />
        </div>
        <div>
          <MiddleSlide /> {/* la estoy laburanto atte: tomi */}
          <SuscribeCards />
        </div>
      </div>
    </>
  );
};

export default Home;
