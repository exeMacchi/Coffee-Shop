import { Link } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../utilities/routes";

export default function Footer({isHomePage, isAdminPage}) {
    return (
        <footer className="bg-yellow-900 dark:bg-slate-900 px-3 py-8 relative z-30">
            <nav className="flex justify-between items-center text-white">
                <ul className="flex gap-4">
                    <li className={`nav__link ${ isHomePage ? 'bg-orange-950 dark:bg-blue-950' : ''}`}>
                        <Link to={PublicRoutes.HomePage}>HOME</Link>
                    </li>
                    <li className={`nav__link ${ isAdminPage ? 'bg-orange-950 dark:bg-blue-950' : ''}`}>
                        <Link to={PrivateRoutes.AdminPage}>ADMIN</Link>
                    </li>
                </ul>

                <Link to={PublicRoutes.HomePage}>LOGO</Link>
            </nav>
            <p className="text-center text-white">
                Copyright {new Date().getFullYear()}
            </p>
        </footer>
    );
}
