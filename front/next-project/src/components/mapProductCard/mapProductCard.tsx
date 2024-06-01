
'use client'
//react
import React, {useEffect, useState} from "react";
//redux
import {useDispatch } from "react-redux";
import { readProducts } from "@/store/reducers/productsSlice";
//componentes
import ProductCard from "../productCard/productCard";
//interfaces 
import { IProduct } from "@/interfaces/interfaz";
//utils
import { fetchProducts } from "@/utils/getProducts";
import { arrayWines } from "@/utils/arrayPreLoad";


export const MapProductCard: React.FC = (): React.ReactNode => {

  const dispatch = useDispatch();
  const [products, setProducts] = useState<IProduct[]>([]);

  //AQUI UTILIZO FUNCION PARA HACER GET DE PRODUCTS
  useEffect(() => {
    fetchProducts(setProducts);
    console.log(products);
    
  }, []);
  

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