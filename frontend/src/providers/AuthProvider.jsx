import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAdminLogged, setIsAdminLogged] = useState(false);

    // TODO: verificar si hay una cookie vigente en el servidor.

    return (
    <AuthContext.Provider value={{isAdminLogged, setIsAdminLogged}}>
        {children}
    </AuthContext.Provider>
    )
}
