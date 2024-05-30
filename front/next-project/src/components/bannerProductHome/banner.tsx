'use client'
import React from "react"
import MapProductCard from "../mapProductCard/mapProductCard"

const BannerProducts = () => {
    return (
        <>  
        {/* RENDERIZA MapProductCard, el cual mapea una card por cada producto.*/}
            <div className="flex justify-center flex-col pt-7 bg-white">
                <div className="flex justify-center flex-row">
                    <MapProductCard/>
                </div>
                <section className="flex justify-center">
                    <span > mas categorias de vinos</span>
                    <button></button>
                    <button></button>
                    <button></button>
                </section>
            </div>
        </>
    )
}

export default BannerProducts;