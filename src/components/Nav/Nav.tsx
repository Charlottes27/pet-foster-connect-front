import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPaw, faFont, faXmark, faUser, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import "./Nav.css";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { IAnimal } from "../../@types/animal";
import { IAssociation } from "../../@types/association";

interface INavProps {
    openMenuBurger: boolean
    setOpenMenuBurger: React.Dispatch<React.SetStateAction<boolean>>
    setEntityFilter: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociation[]>>
    setFilterAnimal: React.Dispatch<React.SetStateAction<{
        species: string;
        gender: string;
        ageRange: string;
        size: string;
    }>>
  setFilterAssociation: React.Dispatch<React.SetStateAction<{
        nameAssociation: string;
        city: string;
    }>>
}

function Nav ({openMenuBurger, setOpenMenuBurger, setEntityFilter, setFilterAnimal, setFilterAssociation}: INavProps) {
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
                <NavLink to={"/animaux"} className="navLink" onClick={()=>{setOpenMenuBurger(false); setEntityFilter([]); setFilterAnimal({
                    species: "",
                    gender: "",
                    ageRange: "all",
                    size: "",
                })}}>
                    <FontAwesomeIcon icon={faPaw} />
                    Animaux
                </NavLink>
                <NavLink to={"/associations"} className="navLink" onClick={()=>{setOpenMenuBurger(false); setEntityFilter([]); setFilterAssociation({
                    nameAssociation: "",
                    city: "",
                })}}>
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