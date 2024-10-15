// Build-in
import { NavLink } from "react-router-dom";

// Utilites
import { PublicRoutes } from "../../utilities/routes";

// Components
import Navbar from "../Navbar/Navbar";


export default function Footer() {
    return (
        <footer className="bg-yellow-900 dark:bg-slate-900 px-3 py-8 relative z-30">
            <nav className="flex flex-col md:flex-row justify-between items-center text-white">
                <div className="flex flex-col md:flex-row w-full md:w-0 gap-4 mb-2">
                    <Navbar/>
                </div>

                <NavLink to={PublicRoutes.HomePage}>LOGO</NavLink>
            </nav>
            <p className="text-center text-white">
                Copyright {new Date().getFullYear()}
            </p>
        </footer>
    );
}
