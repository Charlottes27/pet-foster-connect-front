import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { faHouse, faPaw, faFont, faXmark, faUser, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import "./Nav.css";
import { useAuth } from "../../components/AuthContext/AuthContext";

function Nav () {
    const { isAuthenticated } = useAuth();
    const mobile = useMediaQuery({query: "(max-width: 480px)"});
    
    return (
        <nav className={mobile ? "navMobile " : "nav"}>
            {mobile ? 
                <button type="button" className="closeButton">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            :
            ""}
            <div className="containerLink">
                <NavLink to={"#"} className="navLink">
                    <FontAwesomeIcon icon={faHouse} />
                    Accueil
                </NavLink>
                <NavLink to={"#"} className="navLink">
                    <FontAwesomeIcon icon={faPaw} />
                    Animaux
                </NavLink>
                <NavLink to={"#"} className="navLink">
                    <FontAwesomeIcon icon={faFont} />
                    Associations
                </NavLink>
                {mobile ? 
                <NavLink to={"#"} className="navLink">
                    Connexion / Inscription
                </NavLink>
                :
                ""}
            </div>
        </nav>
    );
}

export default Nav;