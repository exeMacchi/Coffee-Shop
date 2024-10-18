import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";

export default function AppProvider({children}) {
    return (
        <AuthProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AuthProvider>
    )
}
