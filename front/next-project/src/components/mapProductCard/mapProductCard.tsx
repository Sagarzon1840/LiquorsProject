
'use client'
//react
import React, {useEffect, useState} from "react";
import ProductCard from "../productCard/productCard";
import { fetchProducts } from "@/utils/getProducts";
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";

export const MapProductCard: React.FC = (): React.ReactNode => {

 //defino useDispatch para pasarlo como argumento a fetchProducts
 const dispatch = useDispatch()
 const dataGlobal = useSelector((state: any) => state.products.data)
 
 //GET PRODUCTS A LA API + CARGA DE DATOS EN LA STORE.
 useEffect(() => {
  if (dataGlobal.length === 0) {
    fetchProducts(dispatch);
  }
 }, [dispatch, dataGlobal.length])

  //RENDERIZO UNA CARD POR CADA ELEMENTO DE LA STORE.
  return (
      <>
          {/*Mapea el arreglo de productos y renderiza un Card para cada uno*/}
            {dataGlobal.map((product:any) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </>
  );
};

export default  MapProductCard;