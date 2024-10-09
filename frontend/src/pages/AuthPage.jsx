import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider.jsx";

import { register, login } from "../services/authService.js";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FormInput from "../components/Form/FormInput";
import { PrivateRoutes, PublicRoutes } from "../utilities/routes.js";

export default function AuthPage({ isRegisterForm }) {
    const { setAdminLogged } = useAuthContext();

    /* --- FORM --- */
    const [auth, setAuth] = useState({
        username: "",
        password: ""
    });
    const [btnDisabled, setBtnDisabled] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const isFormValid = auth.username.length > 0 &&
                            auth.password.length > 0;

        setBtnDisabled(!isFormValid);
    }, [auth]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Se registra
        if (isRegisterForm) {
            const res = await register(formData);
            if (res.status === 201) {
                console.log(res.data.message);
                navigate(PublicRoutes.HomePage);
            }
            else {
                console.error(res.data.message);
            }
        }

        // Se loguea
        else {
            const res = await login(formData);
            if (res.status === 200) {
                console.log(res.data.message);
                setAdminLogged(true);
                navigate(PrivateRoutes.AdminPage);
            }
            else {
                // TODO: mostrar error en una alerta
                console.error(res.data.message);
            }
        }
    }

    return (
        <>
        <Header/>
        <main className="flex flex-col">
            <h1 className="text-center font-bold text-3xl my-4">
                { isRegisterForm ? "Registrarse" : "Iniciar Sesión" }
            </h1>
            <div className="grow flex flex-col justify-center">
                <form className="flex flex-col justify-center gap-20 w-1/2 mx-auto"
                      onSubmit={handleOnSubmit}>
                    <FormInput id={"username"}
                               type={"text"}
                               name={"username"}
                               inputValue={auth.username}
                               setInputValue={setAuth}
                               labelText={"Usuario"}
                               required/>

                    <FormInput id={"password"}
                               type={"password"}
                               name={"password"}
                               inputValue={auth.password}
                               setInputValue={setAuth}
                               labelText={"Contraseña"}
                               required/>

                    <div className="flex justify-between gap-2">
                    {
                        !isRegisterForm && 
                        (
                            <button className="btn-primary w-1/2" 
                                    onClick={() => navigate(PublicRoutes.RegisterPage)} 
                                    disabled>
                                Registrarse
                            </button>
                        )
                    }
                        <button type="submit" 
                                className={`btn-primary ${ !isRegisterForm ? "w-1/2" : "w-full"}`}
                                disabled={btnDisabled}>
                            { isRegisterForm ? "Registrarse" : "Iniciar sesión" }
                        </button>
                    </div>
                </form>
            </div>
        </main>
        <Footer/>
        </>
    );
}
