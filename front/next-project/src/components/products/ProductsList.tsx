"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Product, fetchProducts } from "@/store/reducers/productsSlice";

const ProductsList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.data);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    /* le puse este condicional para que no stackear infinitamente */
    if (products.length === 0) dispatch(fetchProducts());
    /* esta funcion está declarada en el slice de products */
  }, [dispatch]);

  /* confirmar que products es array */
  if (!Array.isArray(products)) {
    return <div>Loading...</div>;
  }
  console.log("esto es el store", products);
  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        <li>Productos</li>
        {products.map((product: Product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
