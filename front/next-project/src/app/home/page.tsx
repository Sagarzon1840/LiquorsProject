import React from "react";
import BannerProducts from "@/components/bannerProductHome/banner";

const Home: React.FC = ():React.ReactNode => {
  return (
    <>
      <BannerProducts/>
      <hr></hr>
      <BannerProducts/>
    </>
  )
};

export default Home;
