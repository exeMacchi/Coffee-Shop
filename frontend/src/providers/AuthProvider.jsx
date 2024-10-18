import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAdminLogged, setIsAdminLogged] = useState(false);

    return (
    <AuthContext.Provider value={{isAdminLogged, setIsAdminLogged}}>
        {children}
    </AuthContext.Provider>
    )
}
