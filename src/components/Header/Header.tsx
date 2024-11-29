import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom"
import { useState } from "react";

import "./Header.css";
import logo from "../../asset/logo/PetFoster-Logo.png"
import Nav from '../Nav/Nav.tsx';
import { IAnimal } from "../../@types/animal";
import { IAssociation } from "../../@types/association";
import { IFilterAnimal } from "../../@types/filter";
import { IFilterAssociation } from "../../@types/filter";
import { useAuth } from "../AuthContext/AuthContext.tsx";

interface IHeaderProps {
    setEntityFilter: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociation[]>>
    setFilterAnimal: React.Dispatch<React.SetStateAction<IFilterAnimal>>
    setFilterAssociation: React.Dispatch<React.SetStateAction<IFilterAssociation>>
}

function Header ({setEntityFilter, setFilterAnimal, setFilterAssociation}:IHeaderProps) {
    const [openMenuBurger, setOpenMenuBurger] = useState(false);
    
    const mobile = useMediaQuery({query : "(max-width: 480px)"});
    const { isAuthenticated, logout } = useAuth();

    return (
        <>
            <header>
                <section className="headerHeader">
                    <img src={logo} alt="Logo de pet foster connect" />
                    {mobile ? 
                    <button type="button" onClick={()=>setOpenMenuBurger(true)}>
                        <div className="burger">
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                    </button>
                    : 
                    <NavLink to={isAuthenticated ? "#" : "/connexion-inscription"} className="headerConnectionLink" onClick={isAuthenticated ? logout : undefined}>
                        {isAuthenticated ? "Deconnexion" : "Connexion / Inscription"}
                    </NavLink>}
                </section>
                <Nav openMenuBurger={openMenuBurger}
                    setOpenMenuBurger={setOpenMenuBurger}
                    setEntityFilter={setEntityFilter}
                    setFilterAnimal={setFilterAnimal}
                    setFilterAssociation={setFilterAssociation}/>
            </header>
        </>
    );
}

export default Header;