import { useCallback, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async ()=> {
        try {
            const res = await axios.get('https://fakestoreapi.com/products');
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(()=>{
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className="p-5 text-center text-black">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Products</h2>
        <div className="flex flex-wrap justify-center gap-6">
            <ul className="flex flex-col gap-0.5 min-w-60">
            {products.map((product) => (
                <li key={product.id} className="flex items-center cursor-pointer py-1.5 px-2.5 rounded-md align-middle transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-100">
                    <span className="grid place-items-center shrink-0 me-2.5">
                        <img src={product.image} alt={product.title} className="inline-block object-cover object-center data-[shape=square]:rounded-none data-[shape=circular]:rounded-full data-[shape=rounded]:rounded-[current] w-11 h-11 rounded-md"/>
                    </span>
                <div>
                    <p className="font-sans antialiased text-left text-base text-slate-800 font-semibold pr-4">{product.title}</p>
                    <small className="block w-full text-left font-sans antialiased text-sm text-slate-600">Rs. {product.price.toFixed(2)} | Category: {product.category}</small>
                </div>
                <button
                onClick={() => {
                navigate(`products/${product.id}`);
                }}
                className="
                ms-auto px-3 py-1.5 rounded-md bg-slate-700 text-white cursor-pointer
                hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400
                dark:bg-slate-600 dark:hover:bg-slate-500
                transition-all duration-200
                "
                >
                    View Details
                </button>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
}

export default ProductsList;