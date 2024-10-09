import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { getAllProducts, deleteProduct } from "../services/productService";

import Header from "../components/Header/Header";
import EditIcon from "../components/Icons/EditIcon";
import TrashIcon from "../components/Icons/TrashIcon";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import Spinner from "../components/Spinner/Spinner";
import { PrivateRoutes } from "../utilities/routes";


export default function AdminPage() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [processLoading, setProcessLoading] = useState(false);

    const [products, setProducts] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productModal, setProductModal] = useState({});

    const navigate = useNavigate();


    useEffect(() => {
        const source = axios.CancelToken.source();

        getAllProducts(setProducts, setInitialLoading, source.token);

        return () => {
            source.cancel("Componente desmontado, petición cancelada");
        }
    }, []);

    /* Activar el modal pre-eliminación de un producto */ 
    const handleDeleteButton = (product) => {
        setProductModal(product);
        setShowDeleteModal(true);
    }

    /* Eliminar el producto especificado en la base de datos */ 
    const handleDeleteProduct = async (productID, productImage) => {
        setShowDeleteModal(false);
        setProcessLoading(true);
        const resStatus = await deleteProduct(productID, productImage);
        if (resStatus === 200) {
            navigate(PrivateRoutes.AdminPage, { replace: true });
        }
        else {
            // TODO: alerta de error (dependiendo del HTTP Code Status devuelto)
        }
    }

    return (
        <>
        <Header isAdminPage/>

        <main className="flex justify-center gap-3 relative p-1">
        { 
            initialLoading ? (
                <Spinner pxSize={50}/>
            ) : (
                <>
                {
                    processLoading && (
                        <div className="absolute top-0 size-full z-30 backdrop-blur-[1px] 
                                        flex justify-center items-center">
                            <Spinner pxSize={50}/> 
                        </div>
                    )
                }
                <section className="w-2/3">
                    <table className="block">
                        <thead className="block bg-yellow-900 dark:bg-blue-950 rounded-t-3xl text-white ">
                            <tr className="grid grid-cols-5 place-items-center h-10">
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Editar</th>
                                <th>Borrar</th>
                            </tr>
                        </thead>
                        <tbody className="block divide-y-2 divide-yellow-800 dark:divide-blue-900">
                        {
                            products.map((product, index) => (
                                <tr key={index} 
                                    className="grid grid-cols-5 place-items-center min-h-14
                                                last:rounded-b-3xl
                                                bg-orange-100 dark:bg-slate-800
                                                odd:bg-orange-200 dark:odd:bg-slate-700">
                                    <td className="text-center">{product.name}</td>
                                    <td className="text-center">{product.description}</td>
                                    <td className="text-center">${product.price}</td>
                                    <td className="text-center">
                                        <Link to={`${PrivateRoutes.EditPage}/${product.id}`}>
                                            <EditIcon className="size-6 hover:scale-125 transition cursor-pointer"/>
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={ () => handleDeleteButton(product) }>
                                            <TrashIcon className="size-6 hover:scale-125 transition cursor-pointer"/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <Modal open={showDeleteModal} 
                           onClose={() => setShowDeleteModal(false)}>
                            <div className="flex flex-col justify-between h-full gap-5">
                                <h4 className="text-3xl font-bold text-center">
                                    ¿Estás seguro de eliminar el producto?
                                </h4>
                                <p className="text-center">
                                    Se eliminaría el producto <strong>{productModal.name}</strong>
                                </p>
                                <div className="flex justify-between gap-2">
                                    <button className="btn-danger w-1/2"
                                            onClick={() => handleDeleteProduct(productModal.id, productModal.image)}>
                                        Eliminar
                                    </button>
                                    <button className="btn-secondary w-1/2"
                                            onClick={() => setShowDeleteModal(false) }>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                    </Modal>
                </section>
                <aside className="w-1/3">
                    <Link to={PrivateRoutes.CreatePage} 
                          className="btn-primary">
                        CREAR PRODUCTO
                    </Link>
                    <p>FILTROS</p>
                </aside>
                </>
            )
        }
        </main>

        <Footer isAdminPage/>
        </>
    );
}
