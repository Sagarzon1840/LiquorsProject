"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logged } from "../logged/logged";
import { UnLogged } from "../unLogged/unLogged";
import Link from "next/link";

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [token, setToken] = useState(null);

  console.log(token);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("loginToken");
      setToken(JSON.parse(userToken!));
    }
  }, [pathname]);

  return (
    <div>
      <nav className="pt-2">
        <div className="flex justify-between items-center p-3 mx-large">
          <div>
            <Link href="/">
              <p className="font-plus-jakarta-sans text-3xl font-extrabold text-wine ">Liquors</p>
            </Link>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>
                <Link className="buttonSecondary" href="/product">
                  Products
                </Link>
              </li>
              <li>
                <Link className="buttonSecondary" href="/recommendation">
                  Pick of the Month
                </Link>
              </li>
              <li>
                <Link className="buttonSecondary" href="/newsletter">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link className="buttonSecondary" href="/aboutUs">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>{token ? <Logged /> : <UnLogged />}</div>
        </div>
      </nav>
    </div>
  );
};
