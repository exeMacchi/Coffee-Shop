import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

import { getAllProducts } from "../services/productService";
import { productsMock } from "../mocks/products.json";

import Header from "../components/Header/Header";
import ProductCard from "../components/ProductCard/ProductCard";
import Footer from "../components/Footer/Footer";
import Spinner from "../components/Spinner/Spinner";
import { SearchIcon } from "../components/Icons/Icons";

export default function HomePage() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchCategory, setSearchCategory] = useState("name");
    const searchInput = useRef(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        // getAllProducts(setProducts, setInitialLoading, source.token);
        setProducts(productsMock);
        setInitialLoading(false);

        return () => {
            source.cancel("Componente desmontado, petición cancelada");
        }
    }, []);

    /* --- FILTERS --- */
    useEffect(() => {
        if (!initialLoading && products.length > 0) {
            if (searchInput.current.value !== "") {
                setFilteredProducts(filterProducts(products));
            }
            else {
                setFilteredProducts(products);
            }
        }
    }, [products, searchValue, searchCategory]);

    const handleSearch = () => setSearchValue(searchInput.current.value);

    const handleToggleSwitch = (isChecked) => {
        // Se resetea el valor del input
        searchInput.current.value = "";

        // Se configura la categoría de búsqueda
        if (isChecked) {
            setSearchCategory("price");
        }
        else {
            setSearchCategory("name");
        }
    } 

    const filterProducts = (products) => {
        console.count("FILTERPRODUCTS");
        return products.filter(product => {
            switch (searchCategory) {
                case "name":
                    return product.name.toLowerCase().includes(searchValue.toLowerCase());

                case "price":
                    return product.price >= Number(searchValue);

                default:
                    return true;
            }
        });
    }



    return (
        <>
        <Header/>

        <main className={`flex flex-col ${ initialLoading ? "justify-center" : "" }`}>
        {
            initialLoading ? (
                <Spinner pxSize={50}/>
            ) : (
                products.length > 0 ? (
                    <>
                    <section className="flex flex-col md:flex-row gap-4 bg-yellow-900 dark:bg-slate-900 
                                      text-orange-100 dark:text-stone-200
                                        p-4 md:px-2 md:py-4 mx-2 md:mx-0 mb-2 rounded-2xl">
                        {/* BUSCADOR */}
                        <div className="flex gap-2 w-full md:w-2/3">
                            <input type="text"
                                   name="productName"
                                   className="p-0 pl-2 text-stone-800 placeholder:text-stone-500 
                                              focus:outline-2 focus:outline-orange-100"
                                   placeholder="Buscar..."
                                   ref={searchInput}
                                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>

                            <button type="button" 
                                    className="bg-orange-950 hover:bg-orange-900 transition 
                                               dark:bg-blue-900 dark:hover:bg-blue-700 
                                                 rounded-full p-1"
                                    onClick={handleSearch}>
                                <SearchIcon className="size-10"/>
                            </button>
                        </div>

                        {/* CATEGORÍA */}
                        <div className="flex justify-center items-center gap-2 w-full md:w-1/3">
                            <span className="text-orange-200 dark:text-slate-300 font-bold">
                                Nombre
                            </span>
                            <input type="checkbox" 
                                   className="grow-0 relative inline-block appearance-none cursor-pointer
                                              focus:ring-0 focus:outline-none dark:focus:outline-none
                                              h-10 w-20 rounded-full transition-colors duration-500
                                              bg-orange-200 dark:bg-slate-300 
                                              checked:bg-yellow-700 dark:checked:bg-blue-800
                                              after:content-[''] after:absolute 
                                              after:top-1 after:left-1 after:size-8 
                                            after:bg-yellow-900 dark:after:bg-blue-800 
                                            after:checked:bg-orange-200 dark:after:checked:bg-slate-300 
                                              after:rounded-full after:checked:translate-x-10 
                                              after:transition-all after:duration-500"
                                   onChange={(e) => handleToggleSwitch(e.target.checked)}/>
                            <span className="text-orange-200 dark:text-slate-300 font-bold">
                                Precio
                            </span>
                        </div>
                    </section>

                    {
                        filteredProducts.length > 0 ? (
                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
                                                gap-2 px-2 md:px-0">
                            {
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product}/>
                                ))
                            }
                            </section>
                        ) : (
                            <section className="grow flex justify-center items-center">
                                <h2 className="text-4xl md:text-7xl font-bold text-center my-4">
                                    No hay productos
                                </h2>
                            </section>
                        )
                    }
                    </>
                ) : (
                    <section className="grow flex justify-center items-center">
                        <h2 className="text-4xl md:text-7xl font-bold text-center my-4">
                            No hay productos
                        </h2>
                    </section>
                )
            )
        }
        </main>

        <Footer/>
        </>
    );
}
