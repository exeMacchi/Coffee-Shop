import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("El hook se está utilizando dentro de un componente " +
                        "que no tiene acceso al Provider.");
    }

    return context
}

export function AuthProvider({ children }) {
    const [isAdminLogged, setIsAdminLogged] = useState(false);

    return (
    <AuthContext.Provider value={{isAdminLogged, setIsAdminLogged}}>
        {children}
    </AuthContext.Provider>
    )
}
