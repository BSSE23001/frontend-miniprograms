import { useCallback, useEffect, useState } from "react";
import axios from 'axios'
// import { useNavigate } from "react-router-dom";
import {ProductCard} from '../components/ProductCard'

const ProductsList = () => {
    // const navigate = useNavigate();

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
        <div className="p-5 text-center text-black max-w-full">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Products</h2>
        <div className="flex flex-row flex-wrap gap-5 p-5">
        {products.map((p) => (
        <div key={p.id}>
            <ProductCard product={p} />
        </div>
        ))}
        </div>
        </div>
    );
}

export default ProductsList;