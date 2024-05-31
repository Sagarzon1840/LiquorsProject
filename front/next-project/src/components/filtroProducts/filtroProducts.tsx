import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';

interface ProductFilterCardProps {
  onFilterChange: (filters: any) => void;
}

const ProductFilterCard: React.FC<ProductFilterCardProps> = ({ onFilterChange }) => {

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
    <div className="flex flex-col mt-5 bg-white border p-4 ml-0 mr-6 rounded-lg shadow-md w-1/4">
      {/*FILTRO POR TIPO BEBIDA */}
      <h1 className="text-lg font-normal  font-Lora mb-4">Filtros</h1>
      <div className="mb-4 flex p-1 flex-row justify-center">
        <button
          className={`px-4 py-2 rounded ${selectedButton === 'option1' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleButtonClick('option1')}
        >
          vinos
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded ${selectedButton === 'option2' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleButtonClick('option2')}
        >
          gins
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedButton === 'option3' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleButtonClick('option3')}
        >
          licores
        </button>
      </div>
      <hr></hr>

      {/*FILTRO POR RANGO PRECIO U OTRA VARIABLE. */}
      <h1 className="text-lg font-normal pt-3  font-Lora mb-4">Rango de Precio</h1>
      <Slider
        value={priceRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        className="mb-4"
      />
      <hr></hr>
      {/*FILTRO POR VALORACION DEL VINO. */}
      <h1 className="text-lg font-normal pt-3  font-Lora mb-4">Valoración del Vino</h1>
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