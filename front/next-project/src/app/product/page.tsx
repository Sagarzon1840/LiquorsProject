import { ProductDetail } from "@/components/productDetail/productDetail";

const productPreload = {
  id: 1,
  name: "nombre Vino",
  description: "Descripcion del vino",
  category: "vino",
  image: "/vinoCard.jpg",
  price: 100
  }

const Product = async ({params}: {params: { productId: string }}) => {
  // const product = await getDataById(String(params.productId))

  return (
    <ProductDetail product={productPreload} />
  )


};

export default Product;
