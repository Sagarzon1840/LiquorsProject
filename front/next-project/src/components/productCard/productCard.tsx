'use client'
import React, {useState} from "react";
//material UI
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//interface
import { IProduct } from "@/interfaces/interfaz";
//utils (logica para color-borde condicional.)
import { getColorClass } from "@/utils/cardBorderColorDinamic";


const ProductCard: React.FC <{product: IProduct}>= ({product}): React.ReactNode => {

    const colorClass = getColorClass(product.category);

    const getColorClassDos = (category: string): string => {
        if (category === 'vino') {
            return 'border-wine'; 
        } else if (category === 'gin') {
            return 'border-gin'; 
        } else if (category === 'licor'){
            return 'border-licor'; 
        }
        return '';
    };

    const colorClassDos = getColorClassDos(product.category)
    
    return (
        <div className={`flex flex-col bg-white items-center border-t-8 hover:cursor-pointer rounded-t-xl border-solid ${colorClass} ${colorClassDos} border-2 rounded-lg p-4 m-4 w-48`}>
            <h2 className="text-center text-lg font-Lora mb-2">{product.name}</h2>
            <img className="my-2 h-48 w-48 object-cover rounded-md" src={product.image} alt="imagen bebida" />
            <br></br>
            <div className="flex flex-row items-center justify-between w-full mt-2">
                <span className="text-gray-700">4.5</span>
                <div className="flex flex-row justify-center flex-grow mx-2">
                    <StarIcon className="text-gray-300" />
                    <StarIcon className="text-gray-300" />
                    <StarIcon className="text-gray-300" />
                    <StarIcon className="text-gray-300" />
                </div>
                
                <FavoriteBorderIcon className="text-wineMasOscuro " />
            </div>
        </div>
        
    );
}

export default ProductCard;


