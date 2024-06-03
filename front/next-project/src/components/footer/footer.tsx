import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex justify-around items-center p-3 mx-large my-9">
      <div className="">
        <Link href="/">
          <p className="font-plus-jakarta-sans text-3xl font-extrabold text-wine ">
            Liquors
          </p>
        </Link>
      </div>
      <div>
        <ul className="flex space-x-6">
          <li>
            <Link className="buttonSecondary" href="/category">
              Reviews
            </Link>
            <div className="flex flex-col">
              <Link className="buttonTiny" href="/category/rum">
                ron
              </Link>
              <Link className="buttonTiny" href="/category/spirits">
                spirit
              </Link>
              <Link className="buttonTiny" href="/category/whiskey">
                whiskey
              </Link>
              <Link className="buttonTiny" href="/category/wine">
                wine
              </Link>
            </div>
          </li>
          <div className="flex flex-col">
            <li>
              <Link className="buttonSecondary" href="/recommendation">
                Recomendacion del mes
              </Link>
            </li>
            <li>
              <Link className="buttonSecondary" href="/newsletter">
                Newsletter
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};
