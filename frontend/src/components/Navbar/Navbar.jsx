import { NavLink } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../utilities/routes";

export default function Navbar() {
    return (
        <>
        <NavLink to={PublicRoutes.HomePage}
                 className={ ({isActive}) => `nav__link ${ isActive ? "bg-orange-950 dark:bg-blue-950" : ""}` }>
            HOME
        </NavLink>
        <NavLink to={PrivateRoutes.AdminPage}
                 className={ ({isActive}) => `nav__link ${ isActive ? "bg-orange-950 dark:bg-blue-950" : ""}` }>
            ADMIN
        </NavLink>
        </>
    );
}
