"use client";
import { ProductDetail } from "@/components/productDetail/productDetail";
import { ReviewContainer } from "@/components/reviewContainer/reviewContainer";
import { ReviewForm } from "@/components/reviewForm/reviewForm";
import { Product } from "@/interfaces/interfaz";
import { useEffect, useState } from "react";

const productTemporal = {
  id: 1,
  name: "nombre Vino",
  description: "Descripcion del vino",
  category: "vino",
  image: "/vinoCard.jpg",
  price: 100,
};

const reviewTemporal = [
  {
    id: 1,
    rate: 4.5,
    comment: "Comentario del vino",
    user: "Cesar",
  },

  {
    id: 2,
    rate: 3.5,
    comment: "Comentario del vino",
    user: "Juan",
  },

  {
    id: 3,
    rate: 2.5,
    comment: "Comentario del vino",
    user: "Tomi",
  },
];

const ProductF = ({ params }: { params: { productId: string } }) => {
  // const product = await getDataById(String(params.productId))

  //estado local para guardar el detalle del producto. Luego enviar esta data por prop a ProductDetail?.
  const [detailProduct, setDetailProduct] = useState<Partial<Product>>({});

  console.log("detalle producto", detailProduct);

  //descargo del localstorage el detalle del producto y lo guardo en el estado local.
  useEffect(() => {
    const detailProductStorage: any = localStorage.getItem("detailProduct");
    detailProductStorage && setDetailProduct(JSON.parse(detailProductStorage));
  }, []);

  return (
    <div className="mx-large flex flex-col gap-10">
      <ProductDetail product={detailProduct as Product} />
      <div className="flex flex-row gap-8">
        <div className="flex flex-col">
          <h1 className="text-black">{`Conoce la opinion de nuestros usuarios sobre ${detailProduct.name}`}</h1>
          <ReviewContainer reviews={reviewTemporal} />
        </div>
        <div>
          <ReviewForm />
        </div>
      </div>
    </div>
  );
};

export default ProductF;
