import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPaw, faFont, faXmark, faUser, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import "./Nav.css";
import { useAuth } from "../../components/AuthContext/AuthContext";

interface INavProps {
    openMenuBurger: boolean
    setOpenMenuBurger: React.Dispatch<React.SetStateAction<boolean>>
}

function Nav ({openMenuBurger, setOpenMenuBurger}: INavProps) {
    const { isAuthenticated } = useAuth();
    const mobile = useMediaQuery({query: "(max-width: 480px)"});
    
    return (
        <nav className={mobile ? (openMenuBurger ? "navMobile active" : "navMobile"): "nav"}>
            {mobile ? 
                <button type="button" className="closeButton" onClick={()=>setOpenMenuBurger(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            :
            ""}
            <div className="containerLink">
                <NavLink to={"/"} className="navLink" onClick={()=>setOpenMenuBurger(false)}>
                    <FontAwesomeIcon icon={faHouse} />
                    Accueil
                </NavLink>
                <NavLink to={"/animaux"} className="navLink" onClick={()=>setOpenMenuBurger(false)}>
                    <FontAwesomeIcon icon={faPaw} />
                    Animaux
                </NavLink>
                <NavLink to={"/associations"} className="navLink" onClick={()=>setOpenMenuBurger(false)}>
                    <FontAwesomeIcon icon={faFont} />
                    Associations
                </NavLink>
                {mobile ? 
                <NavLink to={"/connexion-inscription"} className="navLink" onClick={()=>setOpenMenuBurger(false)}>
                    Connexion / Inscription
                </NavLink>
                :
                ""}
            </div>
        </nav>
    );
}

export default Nav;