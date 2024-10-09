import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getProduct, createProduct, editProduct } from "../services/productService";

/* --- COMPONENTES --- */
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import FormInput from "../components/Form/FormInput";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";
import { PrivateRoutes } from "../utilities/routes";

export default function CreateEditPage() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [processLoading, setProcessLoading] = useState(false);

    const { id } = useParams();
    const productImgForm = useRef();
    const navigate = useNavigate();

    /* --- FORM STATE --- */
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        image: "/productImages/productPlaceholder.jpg"
    });
    const [btnDisabled, setBtnDisabled] = useState(true);

    /* --- INITIAL CONFIG --- */
    useEffect(() => {
        let source = null

        // Si se edita un producto
        if (id) {
            source = axios.CancelToken.source();
            getProduct(id, setProduct, setInitialLoading, source.token);
        }
        // Si se crea un producto
        else {
            setInitialLoading(false);
        }

        return () => {
            source?.cancel();
        }
    }, []);

    /* --- FORM BTN --- */
    useEffect(() => {
        if (!initialLoading) {
            const isFormValid = product.name.length > 0 && 
                                product.description.length > 0 &&
                                product.price > 0;

            setBtnDisabled(!isFormValid);
        }
    }, [product]);

    /* --- INPUT FILE --- */
    const handleFileOnChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                productImgForm.current.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    /* --- FORM SUBMIT --- */
    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();
            setProcessLoading(true);
            const formData = new FormData(e.target);
            /* --- Se edita un producto --- */
            if (id) {
                const resStatus = await editProduct(id, formData);

                if (resStatus === 200) {
                    navigate(PrivateRoutes.AdminPage);
                }
                else {
                    // TODO: ALERTA DE ERROR AL MODIFICAR PRODUCTO
                }
            }
            /* --- Se crea un producto --- */
            else {
                const resStatus = await createProduct(formData);

                if (resStatus === 201) {
                    navigate(PrivateRoutes.AdminPage);
                }
                else {
                    // TODO: ALERTA DE ERROR AL CREAR EL PRODUCTO
                }
            }
            setProcessLoading(false);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <Header isAdminPage/>

        <main className="flex flex-col relative p-1">
            <h1 className="text-3xl text-center py-2">
                { id ? "Editar producto" : "Crear producto"}
            </h1>
            {
                processLoading &&
                ( 
                    <div className="absolute top-0 size-full z-30 backdrop-blur-[1px] 
                                    flex justify-center items-center">
                        <Spinner pxSize={50}/> 
                    </div>
                )
            }
            <form className="grow flex flex-col justify-center mb-2 gap-4" 
                  onSubmit={handleOnSubmit}
                  encType="multipart/form-data">
            {
                initialLoading ? (
                    <Spinner pxSize={50}/>
                ) : (
                    <>
                    <section className="flex gap-3">
                        <div className="flex flex-col gap-10 w-1/2">
                            <FormInput id={"product_name"}
                                       type={"text"} 
                                       name={"name"}
                                       inputValue={product.name}
                                       setInputValue={setProduct}
                                       labelText={"Nombre del producto"}
                                       required/>

                            <FormInput id={"product_description"} 
                                       type={"textarea"}
                                       name={"description"}
                                       inputValue={product.description}
                                       setInputValue={setProduct}
                                       labelText={"Descripción del producto"}
                                       required/>
                            
                            <div className="flex">
                                <span className="flex justify-center items-center 
                                               bg-orange-950 dark:bg-blue-950 h-full w-20 rounded-l-3xl 
                                                 border-4 border-yellow-700 font-bold text-white
                                               dark:border-blue-900">
                                    $
                                </span>
                                <FormInput id={"product_price"} 
                                           type={"number"} 
                                           name={"price"}
                                           inputValue={product.price}
                                           setInputValue={setProduct}
                                           labelText={"Precio del producto"}
                                           required/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-10 w-1/2">
                            <div className="relative">
                                <input type="file" 
                                       name="productImage"
                                       onChange={handleFileOnChange}
                                       className="py-3 w-full"
                                       accept=".jpg, .jpeg, .png"/>

                                <label className="absolute right-0 top-1 text-gray-600/50 
                                                  px-3 text-sm">
                                    Imagen del producto
                                </label>
                            </div>
                            

                            <figure className="flex justify-center">
                                <img src={product.image} 
                                     ref={productImgForm}
                                     className="max-h-64"/>
                            </figure>

                            {
                                // Cuando se edita un producto, se guarda una referencia
                                // de la imagen actual para que, en caso de que se modifique
                                // la imagen, en el servidor se borre la imagen antigua.
                                id && 
                                (
                                    <input type="text"
                                           name="productPrevImage"
                                           className="hidden"
                                           value={product.image} 
                                           readOnly/>
                                ) 
                            }
                        </div>
                    </section>

                    <section className="flex justify-end gap-2">
                        <button type="submit"
                                className="btn-primary w-1/4"
                                disabled={btnDisabled}>
                            {id ? "EDITAR" : "CREAR"}
                        </button>
                        <Link to={PrivateRoutes.AdminPage}
                              className="btn-primary w-1/4">
                            CANCELAR
                        </Link>
                    </section>
                    </>
                )
            }
            </form>
        </main>
        <Footer isAdminPage/>
        </>
    );
}
