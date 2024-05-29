'use client'
import React from "react"
import ProductCard from "../productCard/productCard"

const BannerProducts = () => {
    return (
        <>
            <div className="flex justify-center flex-col bg-white">
                <div className="flex justify-center flex-row">
                    <h1></h1>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
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