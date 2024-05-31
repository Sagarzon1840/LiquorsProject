'use client'
import {IProduct} from "@/interfaces/interfaz";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';

export const ProductDetail = ({product} : {product: IProduct} ) => {

    const { id, name, description, image, category } = product

    const [favorite, setFavorite] = useState(false)
    
    // aca deberia ir la logica que impide agregar a favoritos sin el login

    const handlerOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setFavorite(!favorite)
    }

    return (
        <div key={id} className="flex flex-row gap-10">
            <div className="w-1/2 flex items-center justify-center">
                <img src={image} alt={name} className="imageProductDetail" />
            </div>
            <div className="space-y-3">
                <div className="w-250 flex flex-col gap-2">
                    <h2 className="header1">{name}</h2>
                    <div className="flex flex-row items-center">
                        <span className="text-beige">4.5</span>
                        <div className="flex flex-row justify-center flex-grow mx-2">
                            <StarIcon className="text-gray-300" />
                            <StarIcon className="text-gray-300" />
                            <StarIcon className="text-gray-300" />
                            <StarIcon className="text-gray-300" />
                        </div>
                    </div>
                    <h3 className="subtitle2">{category}</h3>
                    <p className="body1">pais de procedencia</p>
                </div>
                <p className="body1">{description}</p>
            </div>
        </div>
)
};