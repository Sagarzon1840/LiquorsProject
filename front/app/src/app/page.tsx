import SquareWineLanding from "@/tomiComponents/squareLanding/SquareWineLanding";
import HalfLanding from "@/tomiComponents/halfLanding/HalfLanding";
import SquareWhiskeyLanding from "@/tomiComponents/squareLanding/SquareWhiskeyLanding";
import SquareSpiritsLanding from "@/tomiComponents/squareLanding/SquareSpiritsLanding";
import SquareRumLanding from "@/tomiComponents/squareLanding/SquareRumLanding";
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
