import React from "react";
import Link from "next/link";

const HalfLanding = () => {
  return (
    <div>
      component HalfLanding
      <div>
        <img
          src="/liquors1.jpg"
          alt="halfImage"
          className="max-w-full max-h-auto"
        />

        <button className="flex items-center justify-center bg-white text-black m-2 p-2 w-20 border border-black rounded">
          elButton <Link href="/home"></Link>
        </button>
      </div>
    </div>
  );
};

export default HalfLanding;
