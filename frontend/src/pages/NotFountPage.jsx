import { Link } from "react-router-dom";
import { PublicRoutes } from "../utilities/routes";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function NotFoundPage({}) {
    return (
    <>
        <Header/>
        <main className="flex flex-col justify-center gap-28">
            <h1 className="text-5xl font-bold text-center my-4">
                Página solicitada no encontrada
            </h1>
            <div className="">
                <Link to={PublicRoutes.HomePage} 
                      className="btn-primary w-1/2 mx-auto">
                    Volver al inicio
                </Link>
            </div>
        </main>
        <Footer/>
    </>
    );
}
