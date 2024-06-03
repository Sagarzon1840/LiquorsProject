"use client"
import MapProductCardFiltered from "@/components/mapProductCardFiltered/filtred"

const ProductFiltered = () => {
    return (
       <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MapProductCardFiltered/>
            </div>
        </>
    )
}

export default ProductFiltered;