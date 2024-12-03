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
import { useDeconnexion } from "../../utils/deconnexion.ts";
import { IUser } from "../../@types/user";

interface IHeaderProps {
    setEntityFilter: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociation[]>>
    setFilterAnimal: React.Dispatch<React.SetStateAction<IFilterAnimal>>
    setFilterAssociation: React.Dispatch<React.SetStateAction<IFilterAssociation>>
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

function Header ({setEntityFilter, setFilterAnimal, setFilterAssociation, setUser}:IHeaderProps) {
    const [openMenuBurger, setOpenMenuBurger] = useState(false);
    
    const mobile = useMediaQuery({query : "(max-width: 480px)"});
    const { isAuthenticated } = useAuth();
    const deconnexion = useDeconnexion();

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
                    <NavLink to={isAuthenticated ? "#" : "/connexion-inscription"} className="headerConnectionLink" onClick={isAuthenticated ? deconnexion(setUser) : undefined}>
                        {isAuthenticated ? "Déconnexion" : "Connexion / Inscription"}
                    </NavLink>}
                </section>
                <Nav openMenuBurger={openMenuBurger}
                    setOpenMenuBurger={setOpenMenuBurger}
                    setEntityFilter={setEntityFilter}
                    setFilterAnimal={setFilterAnimal}
                    setFilterAssociation={setFilterAssociation}
                    setUser={setUser}/>
            </header>
        </>
    );
}

export default Header;