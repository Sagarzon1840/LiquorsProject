import SquareWineLanding from "@/components/squareLanding/SquareWineLanding";
import HalfLanding from "@/components/halfLanding/HalfLanding";
import SquareWhiskeyLanding from "@/components/squareLanding/SquareWhiskeyLanding";
import SquareSpiritsLanding from "@/components/squareLanding/SquareSpiritsLanding";
import SquareRumLanding from "@/components/squareLanding/SquareRumLanding";
import MiddleLanding from "@/components/middleLanding/MiddleLanding";
import MiddleLanding2 from "@/components/middleLanding/MiddleLanding2";
import MiddleSlide from "@/components/middleLanding/MiddleSlide";
export default function Landing() {
  return (
    <div>
      <div className="flex flex-row">
        <HalfLanding />
        <div className="grid grid-cols-2 ">
          <SquareWineLanding />
          <SquareWhiskeyLanding />
          <SquareSpiritsLanding />
          <SquareRumLanding />
        </div>
      </div>
      <div>
        <MiddleLanding2 />
      </div>
      <div>
        <MiddleSlide /> {/* la estoy laburanto atte: tomi */}
        <MiddleLanding />
      </div>
    </div>
  );
}
