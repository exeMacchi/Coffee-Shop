import { useState } from "react";
import { PlusIcon, MinusIcon } from "../Icons/Icons";

export default function ProductCard({ product }) {
    const [productQuantity, setProductQuantity] = useState(0);

    const handleAddCart = () => {}

    return (
        <article className="border-2 rounded-lg overflow-hidden 
                          border-yellow-950 dark:border-slate-300
                            hover:cursor-pointer hover:shadow-xl">
            <figure className="min-w-full max-h-52 overflow-hidden">
                <img className="object-contain size-full hover:scale-110 transition duration-500"
                     src={product.image}></img>
            </figure>
            <div className="bg-orange-200 dark:bg-slate-700 flex flex-col items-center gap-3 p-4">
                <h4 className="text-2xl font-bold">{product.name}</h4>
                <p className="text-xl">{product.description}</p>
                <span className="italic text-2xl">${product.price}</span>
            </div>
            <div className="flex justify-between p-3 gap-2 bg-yellow-900 dark:bg-slate-800">
                <button type="button" 
                        className="bg-yellow-800 hover:bg-yellow-700 
                                   dark:bg-blue-900 dark:hover:bg-blue-800 
                                     px-4 text-2xl border-2
                                   border-orange-200 text-orange-100 rounded-2xl 
                                     flex justify-center items-center"
                        onClick={() => setProductQuantity(productQuantity > 0 ? productQuantity - 1 : productQuantity)}>
                    <MinusIcon className="size-10"/>
                </button>
                <input type="number" 
                       className="text-center text-2xl p-0 pl-3 w-full" 
                       min={0} 
                       value={productQuantity} 
                       readOnly/>
                <button type="button"
                        className="bg-yellow-800 hover:bg-yellow-700 
                                   dark:bg-blue-900 dark:hover:bg-blue-800 
                                     px-4 text-2xl border-2
                                   border-orange-200 text-orange-100 rounded-2xl 
                                     flex justify-center items-center"
                        onClick={() => setProductQuantity(productQuantity + 1)}>
                    <PlusIcon className="size-10"/>
                </button>
            </div>
            <div className="px-2 pb-2 bg-yellow-900 dark:bg-slate-800">
                <button type="button" 
                        className="text-center p-2 w-full border-2 border-orange-200
                                 bg-yellow-800 hover:bg-yellow-700 
                                 dark:bg-blue-900 dark:hover:bg-blue-800
                                   rounded-2xl text-orange-100 uppercase"
                        onClick={handleAddCart}>
                    Agregar al carrito
                </button>
            </div>
        </article>
    );
}
