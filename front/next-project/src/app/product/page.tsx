"use client";
import ProductFilterCard from "@/components/filtroProducts/filtroProducts";
import MapProductCard from "@/components/mapProductCard/mapProductCard";
import { SearchBar } from "@/components/searchBar/searchBar";
import { useState } from "react";

const Product: React.FC = (): React.ReactNode => {
  //aqui guardaria los valores de los filtros
  const [filters, setFilters] = useState<any>({});

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    //Aquí se maneja la lógica de filtrado de productos usando los filtros actualizados.
  };
  return (
    <div>
      <SearchBar></SearchBar>
      <div className="flex pt-10  items-start">
        <ProductFilterCard onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MapProductCard />
        </div>
      </div>
    </div>
  );
};

export default Product;
