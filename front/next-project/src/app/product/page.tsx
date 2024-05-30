import BannerProducts from "@/components/bannerProductHome/banner";

const Product: React.FC = ():React.ReactNode => {
  return (
    <div className="flex flex-col overflow-auto pt-10 items-center">
      <h1 className="text-center text-2xl font-bold mb-4">
        Explora nuestras categorías de vinos
      </h1>
      <BannerProducts />
  </div>
  )
};

export default Product;
