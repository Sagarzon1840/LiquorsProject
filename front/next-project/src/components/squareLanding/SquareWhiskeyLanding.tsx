import React from "react";
import Link from "next/link";
const SquareWhiskeyLanding = () => {
  return (
    <div className="relative h-[25vw] w-[25vw] opacity-90">
      <Link href="category/whiskey">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/squareWhiskey.png"
            alt="categoryImage"
            className="object-cover w-full h-[110%]"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 bg-yellow-900 opacity-0 hover:opacity-80">
          <h2 className="text-center">Whiskey</h2>
        </div>
      </Link>
    </div>
  );
};

export default SquareWhiskeyLanding;
