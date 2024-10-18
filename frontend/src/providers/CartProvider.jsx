import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

export function useCartContext() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_PRODUCT":
                // TODO: verificar que el producto que se intenta agregar no esté
                // Y en caso de estar, agregar más en la cantidad.
                state.push(action.payload);
                break;

            case "REMOVE_PRODUCT":
                state = state.filter(product => product.id !== action.payload.id);
                break;
        }
    }, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}
