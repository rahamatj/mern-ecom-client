import React from 'react'
import Product from '@/components/Product.jsx'
import { useParams } from "react-router-dom";

const ProductDetails = () => {

    const { id } = useParams();

    return (
        <>
            <Product id={id} />
        </>
    )
}
export default ProductDetails
