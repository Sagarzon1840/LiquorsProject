import { arrayRecommendations } from "@/utils/arrayRecommendations";
import HalfRecommendation from "./Halfrecomendation";

const HalfRecommendationFather = () => {
  return (
    <div className="flex bg-greyVivino ">
      {arrayRecommendations.map((recommendation, index) => (
        <HalfRecommendation key={index} recommendation={recommendation} />
      ))}
    </div>
  );
};

export default HalfRecommendationFather;
