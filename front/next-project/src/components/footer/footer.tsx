export const Footer = () => {
    return (
        <div className="flex justify-around items-center p-3 mx-large my-9">
            <div className="">
                <a href="/">
                    <img className="w-50" src="/logo.png" alt="logo" />
                </a>
            </div>  
            <div>
                <ul className="flex space-x-6">
                    <li>
                        <a className="buttonSecondary" href="/category">Reviews</a>
                        <div className="flex flex-col">
                            <a className="buttonTiny" href="/category/rum">ron</a>
                            <a className="buttonTiny" href="/category/spirits">spirit</a>
                            <a className="buttonTiny" href="/category/whiskey">whiskey</a>
                            <a className="buttonTiny" href="/category/wine">wine</a>
                        </div>
                    </li>
                    <div className="flex flex-col">
                        <li>
                            <a className="buttonSecondary" href="/recommendation">Recomendacion del mes</a>
                        </li>
                        <li>
                            <a className="buttonSecondary" href="/newsletter">Newsletter</a>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
}