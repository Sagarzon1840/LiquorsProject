"use client";
import ProductFilterCard from "@/components/filtroProducts/filtroProducts";
import MapProductCard from "@/components/mapProductCard/mapProductCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Product: React.FC = (): React.ReactNode => {
  
  //aqui guardaria los valores de los filtros
  const [filters, setFilters] = useState<any>({});
  //valors de barra de busqueda
  const [search, setSearch] = useState({item: ''});

  const router = useRouter()

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    //Aquí se maneja la lógica de filtrado de productos usando los filtros actualizados.
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  }

  const itemSubmit = () => {
    const item = JSON.stringify(search)
    localStorage.setItem("itemCategory", item)
    setTimeout(() => {
      router.push("/product/productFilteredBar")
    },300)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Previene el comportamiento por defecto del Enter
      itemSubmit(); // Llama a la función itemSubmit
    }
  };

  return (
    <div>
      <div className="flex flex-col bg-greyVivino items-center">
        <input placeholder="buscar..." 
          className=" p-2 mb-2 pb-2  rounded-[25px] border border-gray-300 mt-2"
          type="text" 
          value={search.item} 
          name="item" 
          onKeyDown={handleKeyDown} 
          onChange={inputHandler}/>
      </div>
      <div className="flex pt-10 pb-10 bg-greyVivino  items-start">
        <ProductFilterCard onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           <MapProductCard />
        </div>
      </div>
    </div>
  );
};

export default Product;
