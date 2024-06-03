"use client";
import { Product } from "@/interfaces/interfaz";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";

export const ProductDetail = ({ product }: { product: Product }) => {
  const { id, name, description, imgUrl, category } = product;

  const [favorite, setFavorite] = useState(false);

  // aca deberia ir la logica que impide agregar a favoritos sin el login

  const handlerOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFavorite(!favorite);
  };

  return (
    <div key={id} className="flex flex-row gap-10">
      <div className="w-1/2 flex items-center justify-center">
        <img src={imgUrl} alt={name} className="imageProductDetail" />
      </div>
      <div className="space-y-3">
        <div className="w-250 flex flex-col gap-2">
          <h2 className="text-black">{name}</h2>
          <div className="flex flex-row items-center">
            <span className="text-black">4.5</span>
            <div className="flex flex-row justify-center flex-grow mx-2">
              <StarIcon className="text-gray-400" />
              <StarIcon className="text-gray-400" />
              <StarIcon className="text-gray-400" />
              <StarIcon className="text-gray-400" />
            </div>
          </div>
          <h3 className="subtitle2 text-black">{category}</h3>
          <p className="body1">pais de procedencia</p>
        </div>
        <p className="body1 text-black">{description}</p>
      </div>
    </div>
  );
};
