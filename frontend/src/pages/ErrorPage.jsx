import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { PublicRoutes } from "../utilities/routes";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Alert from "../components/Alert/Alert";
import Spinner from "../components/Spinner/Spinner";

export default function ErrorPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!location.state?.alert) {
            navigate(PublicRoutes.HomePage, { replace: true });
        }

        setLoading(false);
    }, []);

    return (
        <>
        <Header/>
        <main className="flex flex-col justify-center gap-8">
        {
            loading ? (
                <Spinner pxSize={50}/>
            ) : (
                <>
                <Alert type={"error"} 
                       title={location.state?.title} 
                       message={location.state?.message} />
                <Link to={PublicRoutes.HomePage} className="btn-primary">
                    VOLVER AL INICIO
                </Link>
                </>
            )
        }
        </main>
        <Footer/>
        </>
    );
}
