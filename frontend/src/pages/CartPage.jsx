import { useCartContext } from "../providers/CartProvider";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"
import { TrashIcon, MinusIcon, PlusIcon } from "../components/Icons/Icons";

export default function CartPage() {
    const { cart, dispatch } = useCartContext();

    return (
        <>
        <Header/>
        <main className="flex flex-col justify-between">
        {
            cart?.length > 0 ? (
                <>
                {/* Detallar el pedido */}
                <section>
                    <h1 className="text-center text-3xl rounded-t-3xl
                                 text-orange-50 dark:text-slate-50
                                 bg-yellow-900 dark:bg-blue-950">
                        DETALLE DE PAGO
                    </h1>
                    <table className="block">
                        <thead className="block bg-yellow-900 dark:bg-blue-950 
                                        text-orange-50 dark:text-slate-50">
                            <tr className="grid grid-cols-5 place-items-center h-10 py-2">
                                <th>IMAGEN</th>
                                <th>NOMBRE</th>
                                <th>PRECIO</th>
                                <th>CANTIDAD</th>
                                <th>REMOVER</th>
                            </tr>
                        </thead>
                        <tbody className="block divide-y-2 divide-yellow-800 dark:divide-slate-900">
                        {
                            cart.map(cartProduct => (
                                <tr key={cartProduct.id} 
                                    className="grid grid-cols-5 place-items-center py-2 
                                               last:rounded-b-3xl bg-orange-100 dark:bg-slate-800
                                             odd:bg-orange-200 dark:odd:bg-slate-700">
                                    {/* IMAGEN */}
                                    <td>
                                        <img src={cartProduct.image} 
                                             className="size-28 rounded-3xl"/>
                                    </td>

                                    {/* NOMBRE */}
                                    <td>{cartProduct.name}</td>

                                    {/* PRECIO */}
                                    <td>$ {cartProduct.price * cartProduct.quantity}</td>

                                    {/* CANTIDAD */}
                                    <td className="flex justify-between items-center">
                                        <button type="button"
                                                className="w-1/3 flex justify-center"
                                                onClick={() => dispatch({
                                                    type: "UPDATE_PRODUCT_CART",
                                                    payload: {
                                                        id: cartProduct.id,
                                                        quantity: Math.max(cartProduct.quantity - 1, 1)
                                                    }
                                        })}>
                                            <MinusIcon className="size-8 hover:scale-125"/>
                                        </button>
                                        <input type="number"
                                               className="text-center text-2xl p-0 pl-2 w-1/3 
                                                          bg-transparent dark:bg-transparent 
                                                          dark:text-slate-200"
                                               min={1}
                                               value={cartProduct.quantity}
                                               readOnly/>
                                        <button type="button"
                                                className="w-1/3 flex justify-center"
                                                onClick={() => dispatch({
                                                    type: "UPDATE_PRODUCT_CART",
                                                    payload: {
                                                        id: cartProduct.id,
                                                        quantity: cartProduct.quantity + 1
                                                    }
                                        })}>
                                            <PlusIcon className="size-8 hover:scale-125"/>
                                        </button>
                                    </td>

                                    {/* REMOVER */}
                                    <td>
                                        <button type="button"
                                                onClick={() => dispatch({ type: "REMOVE_PRODUCT_CART", 
                                                                          payload: cartProduct.id})}>
                                            <TrashIcon className="size-8 hover:scale-125 
                                                                  transition cursor-pointer"/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </section>

                {/* Sección de confirmar pedido */}
                <section className="w-1/2 ml-auto">
                    <h3 className="text-center text-3xl rounded-t-3xl py-3
                                 text-orange-50 dark:text-slate-50
                                 bg-yellow-900 dark:bg-blue-950">
                        RESUMEN DE PAGO
                    </h3>
                    <div className="bg-orange-200 dark:bg-slate-700 py-5 px-2">
                        <p className="text-2xl text-end">
                            TOTAL A PAGAR: ${cart.reduce((total, cartProduct) => total + (cartProduct.price * cartProduct.quantity), 0)}
                        </p>
                    </div>
                    <button className="w-full rounded-b-3xl text-xl text-center py-3
                                     text-orange-50 dark:text-slate-50 
                                     bg-yellow-900 hover:bg-yellow-800 
                                     dark:bg-blue-950 dark:hover:bg-blue-900">
                        CONFIRMAR PEDIDO
                    </button>
                </section>
                </>
            ) : (
                <section>
                    <h2>CARRITO DE COMPRAS</h2>
                </section>
            )
        }
        </main>
        <Footer/>
        </>
    );
}
