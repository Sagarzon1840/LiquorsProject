import Link from "next/link";

const ErrorPage = () => {
  return <div className="flex flex-col justify-center items-center gap-4 my-10">
    <img src="/404.png" alt="404" />
    <h1 className="header1">PAGE NOT FOUND</h1>
    <p className="body1">Disculpa! No encontramos la pagina que estabas buscando</p>
    <Link href="/" className="buttonPrimary" >ir al Home</Link>
  </div>;
};

export default ErrorPage;
