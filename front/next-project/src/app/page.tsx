import SquareWineLanding from "@/components/squareLanding/SquareWineLanding";
import HalfLanding from "@/components/halfLanding/HalfLanding";
import SquareWhiskeyLanding from "@/components/squareLanding/SquareWhiskeyLanding";
import SquareSpiritsLanding from "@/components/squareLanding/SquareSpiritsLanding";
import SquareRumLanding from "@/components/squareLanding/SquareRumLanding";
export default function Landing() {
  return (
    <div className="flex flex-row">
      <HalfLanding />
      <div className="grid grid-cols-2 ">
        <SquareWineLanding />
        <SquareWhiskeyLanding />
        <SquareSpiritsLanding />
        <SquareRumLanding />
      </div>
    </div>
  );
}
