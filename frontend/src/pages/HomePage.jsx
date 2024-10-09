import { useEffect, useState } from "react";
import axios from "axios";

import { getAllProducts } from "../services/productService";

import Header from "../components/Header/Header";
import ProductCard from "../components/ProductCard/ProductCard";
import Footer from "../components/Footer/Footer";
import Spinner from "../components/Spinner/Spinner";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getAllProducts(setProducts, setLoading, source.token);

        return () => {
            source.cancel("Componente desmontado, petición cancelada");
        }
    }, []);

    return (
        <>
        <Header isHomePage/>

        <main className={`${ loading ? "flex flex-col justify-center" 
                                     : "columns-1 md:columns-2 lg:columns-4 "}`}>
        {
            loading ? (
                <Spinner pxSize={50}/>
            ) : (
                products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                ) : (
                    <p>No hay productos</p>
                )
            )
        }
        </main>

        <Footer isHomePage/>
        </>
    );
}
