import { act, createContext, useContext, useReducer } from "react";

const CartContext = createContext();

export function useCartContext() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("El hook se está utilizando dentro de un componente " +
                        "que no tiene acceso al Provider.");
    }

    return context
}

export function CartProvider({ children }) {
    // Persistencia en el localStorage
    const cartInitialState = JSON.parse(localStorage.getItem("cart")) || [];

    // Función de actualización del localStorage.
    const updatedLocalStorage = (state) => {
        localStorage.setItem("cart", JSON.stringify(state));
    }

    /**
     * Función de actualización del estado de la cantidad de un producto en el carrito.
     * @param {Array<Object>} state El estado actual
     * @param {Number} productID El id del producto a actualizar
     * @param {Number} productCartIndex El índice del producto dentro del array del carrito.
     * @param {Number} newQuantity La nueva cantidad a actualizar.
     * @returns El estado actualizado
     */
    const updateProductQuantity = (state, productID, productCartIndex, newQuantity) => {
        // Si no hay índice del producto, se lo busca
        if (!productCartIndex) {
            productCartIndex = state.findIndex(product => product.id === productID);
        }

        if (productCartIndex > -1) {
            const updatedProduct = {
                ...state[productCartIndex],
                quantity: newQuantity
            };

            return [
                ...state.slice(0, productCartIndex),
                updatedProduct,
                ...state.slice(productCartIndex + 1)
            ];
        }

        return state;
    }

    // Reducer completo
    const [cart, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_PRODUCT_CART":
                const productID = action.payload.id
                const productCartIndex = state.findIndex(product => product.id === productID);

                // Se verifica si el producto que se quiere agregar ya está en el carrito,
                // de estarlo, se suma su cantidad a la cantidad actual de manera inmutable.
                if (productCartIndex > -1) {
                    const updatedState = updateProductQuantity(
                        state, 
                        productID, 
                        productCartIndex, 
                        state[productCartIndex].quantity + action.payload.quantity
                    );
                    updatedLocalStorage(updatedState);
                    return updatedState;
                }
                // Si el producto es nuevo, se agrega al carrito de forma inmutable.
                else {
                    const newState = [...state, action.payload];
                    updatedLocalStorage(newState);
                    return newState;
                }

            case "UPDATE_PRODUCT_CART":
                const updatedState = updateProductQuantity(
                    state, 
                    action.payload.id, 
                    null, 
                    action.payload.quantity
                );
                updatedLocalStorage(updatedState);
                return updatedState;

            case "REMOVE_PRODUCT_CART":
                const newState = state.filter(product => product.id !== action.payload);
                updatedLocalStorage(newState);
                return newState;

            case "CLEAR_CART":
                updatedLocalStorage([]);
                return [];

            default:
                return state;
        }
    }, cartInitialState);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}
