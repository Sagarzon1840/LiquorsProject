'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { Logged } from "../logged/logged";
import { UnLogged } from "../unLogged/unLogged";

export const NavBar: React.FC = () => {
    const pathname = usePathname();
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if( typeof window !== "undefined" && window.localStorage) {
            const userToken = localStorage.getItem("userSession");
            setToken(JSON.parse(userToken!))
        }
    }, [pathname])

    return (
        <div>
            <nav className="pt-2">
                <div className="flex justify-between items-center p-3">
                    <div>
                        <h1>logo</h1>
                    </div>
                    <div>
                        <ul className="flex space-x-6">
                            <li>
                                <a className="buttonSecondary" href="/category">Reviews</a>
                            </li>
                            <li>
                                <a className="buttonSecondary" href="/recommendation">Recomendacion del mes</a>
                            </li>
                            <li>
                                <a className="buttonSecondary" href="/newsletter">Newsletter</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {token ? <Logged /> : <UnLogged />}
                    </div>
                </div>
            </nav>
        </div>
    )
};