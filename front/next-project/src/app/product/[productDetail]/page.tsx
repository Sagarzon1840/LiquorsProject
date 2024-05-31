import { ProductDetail } from "@/components/productDetail/productDetail";
import { ReviewContainer } from "@/components/reviewContainer/reviewContainer";
import { ReviewForm } from "@/components/reviewForm/reviewForm";

const productTemporal = {
  id: 1,
  name: "nombre Vino",
  description: "Descripcion del vino",
  category: "vino",
  image: "/vinoCard.jpg",
  price: 100
  }

  const reviewTemporal = [
  {
  id: 1,
  rate: 4.5,
  comment: "Comentario del vino",
  user: "Cesar"
  },

  {
  id: 2,
  rate: 4.5,
  comment: "Comentario del vino",
  user: "Juan"
  },

  {
  id: 3,
  rate: 4.5,
  comment: "Comentario del vino",
  user: "Tomi"
  }

]


const Product = async ({params}: {params: { productId: string }}) => {
  // const product = await getDataById(String(params.productId))

  return (
    <div className="mx-large flex flex-col gap-10">
      <ProductDetail product={productTemporal} />
      <div className="flex flex-row gap-8">
        <div className="flex flex-col">
          <h1 className="header3">{`Conoce la opinion de nuestros usuarios sobre ${productTemporal.name}`}</h1>
          <ReviewContainer reviews={reviewTemporal}/>
        </div>
        <div>
          <ReviewForm />
        </div>
      </div>
    </div>
  )


};

export default Product;
