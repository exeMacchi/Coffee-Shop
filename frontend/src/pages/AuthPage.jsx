import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider.jsx";

import { PrivateRoutes, PublicRoutes } from "../utilities/routes.js";
import { register, login } from "../services/authService.js";
import handleAuthOperationResponse from "../utilities/handleAuthOperationResponse.js";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FloatingLabel from "../components/Form/FloatingLabel.jsx";
import Alert from "../components/Alert/Alert.jsx";

export default function AuthPage({ isRegisterForm }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAdminLogged } = useAuthContext();

    /* --- ALERT --- */
    const [alert, setAlert] = useState({
        isVisible: false,
        type: "",
        title: "",
        message: ""
    });

    /* --- FORM --- */
    const [auth, setAuth] = useState({
        username: "",
        password: ""
    });
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        setIsAdminLogged(false);

        if (location.state?.alert) {
            setAlert({
                isVisible: true,
                type: location.state?.type,
                title: location.state?.title,
                message: location.state?.message
            });
        }
    }, []);

    useEffect(() => {
        const isFormValid = auth.username.length > 0 &&
                            auth.password.length > 0;

        setBtnDisabled(!isFormValid);
    }, [auth]);

    /* Cambia el valor de un input del formulario */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuth((prevInputsValues) => ({
            ...prevInputsValues,
            [name]: value
        }));
    }

    /* En envía el formulario */
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Se registra
        if (isRegisterForm) {
            const res = await register(formData);
            handleAuthOperationResponse(res, navigate, null, setAlert);
        }

        // Se loguea
        else {
            const res = await login(formData);
            handleAuthOperationResponse(res, navigate, setIsAdminLogged, setAlert);
        }
    }

    return (
        <>
        <Header/>
        <main className="flex flex-col">
            {
                alert.isVisible && (
                    <div className="flex justify-center">
                        <div className="w-1/2">
                            <Alert type={alert.type} 
                                   title={alert.title} 
                                   message={alert.message}/>
                        </div>
                    </div>
                )
            }
            <h1 className="text-center font-bold text-3xl my-4">
                { isRegisterForm ? "Registrarse" : "Iniciar Sesión" }
            </h1>
            <div className="grow flex flex-col justify-center">
                <form className="flex flex-col justify-center gap-20 w-1/2 mx-auto"
                      onSubmit={handleOnSubmit}>

                    <FloatingLabel inputID={"username"} labelText={"Usuario"}>
                        <input id="username" 
                               type="text" 
                               className="peer h-14 placeholder-shown:pt-2"
                               name="username"
                               placeholder="Usuario"
                               onChange={handleInputChange}
                               value={auth.username}
                               required/>
                    </FloatingLabel>

                    <FloatingLabel inputID={"password"} labelText={"Contraseña"}>
                        <input id="password"
                               type="password" 
                               name="password"
                               value={auth.password}
                               placeholder="Contraseña"
                               onChange={handleInputChange}
                               className="peer h-14 placeholder-shown:pt-2"
                               required/>
                    </FloatingLabel>

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
