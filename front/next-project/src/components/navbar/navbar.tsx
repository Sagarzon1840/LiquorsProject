"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logged } from "../logged/logged";
import { UnLogged } from "../unLogged/unLogged";
import Link from "next/link";

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      setToken(JSON.parse(userToken!));
    }
  }, [pathname]);

  return (
    <div>
      <nav className="pt-2">
        <div className="flex justify-between items-center p-3 mx-large">
          <div>
            <Link href="/">
              <img className="w-20" src="/logo.png" alt="logo" />
            </Link>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>
                <Link className="buttonSecondary" href="/product">
                  Productos
                </Link>
              </li>
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
            </ul>
          </div>
          <div>{token ? <Logged /> : <UnLogged />}</div>
        </div>
      </nav>
    </div>
  );
};
