import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom"
import { useState } from "react";

import "./Header.css";
import logo from "../../asset/logo/PetFoster-Logo.png"
import logoUser from "../../asset/logo/user.svg"
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
    user: IUser | null
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

function Header ({setEntityFilter, setFilterAnimal, setFilterAssociation, user, setUser}:IHeaderProps) {
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
                    <div className="buttonsHeaderApp">
                        {isAuthenticated && <NavLink to={"/mon-espace/mon-profil"} className="headerConnectionLink"><img src={user?.family?.profile_photo || logoUser} alt="photo de profil" /><p>Bonjour {user?.firstname} / Profil</p></NavLink>}
                        <NavLink to={isAuthenticated ? "#" : "/connexion-inscription"} className="headerConnectionLink" onClick={isAuthenticated ? deconnexion(setUser) : undefined}>
                            {isAuthenticated ? "Déconnexion" : "Connexion / Inscription"}
                        </NavLink>
                    </div>}
                </section>
                <Nav openMenuBurger={openMenuBurger}
                    setOpenMenuBurger={setOpenMenuBurger}
                    setEntityFilter={setEntityFilter}
                    setFilterAnimal={setFilterAnimal}
                    setFilterAssociation={setFilterAssociation}
                    user={user}
                    setUser={setUser}/>
            </header>
        </>
    );
}

export default Header;