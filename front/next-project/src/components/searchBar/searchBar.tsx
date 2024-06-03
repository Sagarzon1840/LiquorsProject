import Link from "next/link";
export const SearchBar: React.FC = () => {
  return (
    <div className="flex flex-row pt-5 bg-greyVivino justify-center gap-6">
      <Link className="buttonPrimary" href="/category/rum">
        ron
      </Link>
      <Link className="buttonPrimary" href="/category/spirits">
        spirit
      </Link>
      <Link className="buttonPrimary" href="/category/whiskey">
        whiskey
      </Link>
      <Link className="buttonPrimary" href="/category/wine">
        wine
      </Link>
    </div>
  );
};
