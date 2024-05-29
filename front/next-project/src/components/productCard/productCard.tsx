'use client'

import React from "react";
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductCard: React.FC = (): React.ReactNode => {
    return (
        <div className="flex flex-col items-center border-t-8 shadow-md hover: cursor-pointer  box-s border-solid border-t-wine bg-transparent rounded-lg  p-4 m-4 w-48">
            <h2 className="text-center text-lg font-normal   mb-2">nombre bebida</h2>
            <img className="my-2 h-48 w-48 object-cover rounded-md" src="/vinoCard.jpg" alt="imagen bebida" />
            <div className="flex flex-row items-center justify-between w-full mt-2">
                <span className="text-gray-700">4.5</span>
                <div className="flex flex-row justify-center flex-grow mx-2">
                    <StarIcon className="text-wine" />
                    <StarIcon className="text-wine" />
                    <StarIcon className="text-wine" />
                    <StarIcon className="text-wine" />
                </div>
                <FavoriteBorderIcon className="text-wineMasOscuro " />
            </div>
        </div>
    );
}

export default ProductCard;


