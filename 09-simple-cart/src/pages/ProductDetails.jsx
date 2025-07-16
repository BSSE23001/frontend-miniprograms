import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import axios from "axios";

const ProductDetails = () => {
    const { addToCart } = useCart();
    const { pid } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://fakestoreapi.com/products/${pid}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProduct();
    }, [pid]);

    if (!product || !product.id) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
        <div className="shadow-sm my-6 w-60">
            <img className="w-full h-full" src={product.image} alt={product.title} />
        </div>
        <div className="p-6 text-center">
            <h4 className="mb-1 text-xl font-semibold text-slate-800">
            {product.title}
            </h4>
            <p
            className="text-sm font-semibold text-slate-500 uppercase">
            Category: {product.category} | Rs. {product.price.toFixed(2)} 
            </p>
            <p className="text-base text-slate-600 mt-4 font-light w-100">
                {product.description}
            </p>
        </div>
        <div className="flex justify-center p-6 pt-2 gap-7">
            <button
            className="min-w-32 cursor-pointer rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
            onClick={() => {
                addToCart(product);
            }}
            >
            Add to Cart
            </button>
        </div>
        </div>
    );
}

export default ProductDetails;