import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

/* --- READ --- */
/**
 * Devolver todos los productos desde la base de datos.
 */
async function getAllProducts( setProducts, setLoading, cancelToken ) {
    try {
        const res = await axios.get(`${BASE_URL}/products`, {
            cancelToken: cancelToken,
        });
        setProducts(res.data);
    }
    catch (err) {
        if (axios.isCancel(err)) {
            console.log("Petición cancelada");
        }
        else {
            console.error(`Error al obtener todos los productos: ${err.message}`);
            setProducts([]);
        }
    }
    finally {
        setLoading(false);
    }
}

async function getProduct( id, setProduct, setLoading, cancelToken ) {
    try {
        const res = await axios.get(`${BASE_URL}/products/${id}`, {
            cancelToken: cancelToken
        });

        const { name, description, price, image } = res.data;

        setProduct({
            name,
            description,
            price,
            image
        });
    }
    catch (err) {
        console.error(`Error al obtener el producto: ${err.message}`);
        setProduct({});
    }
    finally {
        setLoading(false);
    }
}

/* --- CREATE --- */
async function createProduct( formData ) {
    try {
        const res = await axios.post(
                    `${BASE_URL}/products/create`, 
                    formData, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        withCredentials: true
                    });
        return res;
    }
    catch (err) {
        console.error(err);
        return err.response;
    }
}


/* --- UPDATE --- */
async function editProduct( id, formData ) {
    try {
        const res = await axios.put(
            `${BASE_URL}/products/edit/${id}`, 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
        console.log(`res: ${res}`);
        return res;
    }
    catch (err) {
        console.error(err);
        return err.response;
    }
}


/* --- DELETE --- */
async function deleteProduct( productID, productImage ) {
    try {
        const res = await axios.delete(`${BASE_URL}/products/delete/${productID}`, {
            data: { productImage },
            withCredentials: true
        });
        return res;
    }
    catch (err) {
        console.error(err);
        return err.response;
    }
}

export {
    getAllProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
}
