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

        <main className={`flex flex-col ${ loading ? "justify-center" : "" }`}>
        {
            loading ? (
                <Spinner pxSize={50}/>
            ) : (
                products.length > 0 ? (
                    <section className="columns-1 md:columns-2 lg:columns-4">
                    {
                        products.map(product => (
                            <ProductCard key={product.id} product={product}/>
                        ))
                    }
                    </section>
                ) : (
                    <section className="grow flex justify-center items-center">
                        <h1 className="text-7xl font-bold text-center my-4">
                            No hay productos
                        </h1>
                    </section>
                )
            )
        }
        </main>

        <Footer isHomePage/>
        </>
    );
}
