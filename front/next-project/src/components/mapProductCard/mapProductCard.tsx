
'use client'
import React, {useEffect, useState} from "react";
//componentes
import ProductCard from "../productCard/productCard";
//interfaces
import { IProduct } from "@/interfaces/interfaz";
//utils
import { arrayWines } from "@/utils/arrayPreLoad";


export const MapProductCard: React.FC = (): React.ReactNode => {
  
  const [vinos, setVinos] = useState<IProduct[]>([]);

  //AQUI UTILIZO FUNCION PARA HACER GET DE PRODUCTS
  /*useEffect(() => {
    //fetchProducts(setVinos);
  }, []);*/
  
  //RENDERIZO UNA CARD POR CADA VINO RECIBIDO.
  return (
      <>
          {/*Mapea el arreglo de productos y renderiza un Card para cada uno*/}
          
            {arrayWines.map((product:any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          
      </>
  );
};

export default  MapProductCard;