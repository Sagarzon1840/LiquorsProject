import BannerProducts from "@/components/bannerProductHome/banner";

const Product: React.FC = ():React.ReactNode => {
  return (
    <div className="flex flex-col overflow-auto pt-10 items-center">

      {/*SECCION UNO DE TARJETAS */}
      <h1 className="text-center text-2xl text-white font-bold mb-4">
        Explora nuestras categorías de vinos
      </h1>
      <div className="flex space-x-4">
        <BannerProducts />
      </div>

      {/*SECCION DOS DE TARJETAS */}
      <h1 className="text-center text-2xl mt-6 text-white font-bold mb-4">
        Explora nuestras categorías de vinos
      </h1>
      <div className="flex space-x-4">
        <BannerProducts />
      </div>

  </div>
  )
};

export default Product;