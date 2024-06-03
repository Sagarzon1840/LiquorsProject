import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import StarIcon from "@mui/icons-material/Star";

interface ProductFilterCardProps {
  onFilterChange: (filters: any) => void;
}

const ProductFilterCard: React.FC<ProductFilterCardProps> = ({
  onFilterChange,
}) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleButtonClick = (buttonValue: string) => {
    setSelectedButton(buttonValue);
    onFilterChange({ selectedButton: buttonValue, priceRange, selectedRating });
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    onFilterChange({ selectedButton, priceRange: newValue, selectedRating });
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    onFilterChange({ selectedButton, priceRange, selectedRating: rating });
  };

  return (
    <div className="flex flex-col mt-5 bg-greyVivino border p-4 ml-0 mr-6 rounded-lg shadow-md w-1/4">
      {/*FILTRO POR TIPO BEBIDA */}
      <h1 className="text-lg font-normal  font-plus-jakarta-sans mb-4">Filters</h1>
      <div className="mb-4 flex p-1 flex-row justify-center">
        <button
          className={`px-4 py-2 font-plus-jakarta-sans bg-white rounded-3xl border border-solid border-wine ${
            selectedButton === "option1"
              ? "bg-wine text-white"
              : "bg-gray-200 text-wine"
          }`}
          onClick={() => handleButtonClick("option1")}
        >
          wines
        </button>
        <button
          className={`px-4 py-2 mx-2 font-plus-jakarta-sans bg-white rounded-3xl border border-solid border-wine ${
            selectedButton === "option2"
              ? "bg-wine text-white"
              : "bg-gray-200 text-wine"
          }`}
          onClick={() => handleButtonClick("option2")}
        >
          gins
        </button>
        <button
          className={`px-4 py-2  font-plus-jakarta-sans bg-white rounded-3xl border border-solid border-wine ${
            selectedButton === "option3"
              ? "bg-wine text-white"
              : "bg-gray-200 text-wine"
          }`}
          onClick={() => handleButtonClick("option3")}
        >
          liqueur
        </button>
      </div>
      <hr></hr>

      {/*FILTRO POR RANGO PRECIO U OTRA VARIABLE. */}
      <h1 className="text-lg font-normal pt-3  font-plus-jakarta-sans mb-4">Price range</h1>
      <Slider
        value={priceRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        className="mb-4 "
        sx={{
          color: '#e9e9e9',  // Color principal del slider
          '& .MuiSlider-thumb': {
            color: '#c23a2e',  // Color del thumb (el botón que se arrastra)
          },
          '& .MuiSlider-track': {
            color: '#c23a2e',  // Color de la pista (track)
          },
          '& .MuiSlider-rail': {
            color: '#c23a2e',  // Color del rail (parte de la pista no recorrida)
          },
        }}
      />
      <hr></hr>
      {/*FILTRO POR VALORACION DEL VINO. */}
      <h1 className="text-lg font-normal pt-3  font-plus-jakarta-sans mb-4">Wine ratings</h1>
      <div className="flex flex-col space-y-2">
        {[3, 4, 5].map((rating) => (
          <div key={rating} className="flex items-center">
            <Checkbox
              checked={selectedRating === rating}
              onChange={() => handleRatingChange(rating)}
              color="primary"
            />
            <div className="flex">
              {Array.from({ length: rating }, (_, index) => (
                <StarIcon key={index} className="text-yellow-500" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilterCard;
