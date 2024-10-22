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
                <section className="mt-2">
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
                                <th>PRECIO POR UNIDAD</th>
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
                                    <td>$ {cartProduct.price}</td>

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
                <section className="w-1/2 ml-auto mt-4">
                    <h3 className="text-end text-3xl rounded-t-3xl py-3 px-2
                                 text-orange-50 dark:text-slate-50
                                 bg-yellow-900 dark:bg-blue-950">
                        RESUMEN DE PAGO
                    </h3>
                    <div className="flex flex-col bg-orange-200 dark:bg-slate-700 py-5 px-2">
                    {
                        cart.map(cartProduct => (
                            <div className="flex justify-end gap-5 text-2xl">
                                <span className="">{cartProduct.name}</span>
                                <span>$ {cartProduct.price * cartProduct.quantity}</span>
                            </div>
                        ))
                    }
                        <div className="flex justify-end gap-5 text-2xl mt-2 border-t-2
                                      border-t-yellow-900 dark:border-t-blue-950">
                            <span>TOTAL A PAGAR:</span>
                            <span className="font-bold">
                                $ {cart.reduce((total, cartProduct) => total + (cartProduct.price * cartProduct.quantity), 0)}
                            </span>
                        </div>
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
                <section className="grow flex justify-center items-center">
                    <h2 className="text-4xl font-bold">
                        NO HAY PRODUCTOS EN EL CARRITO
                    </h2>
                </section>
            )
        }
        </main>
        <Footer/>
        </>
    );
}
