import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom"
import { useState } from "react";

import "./Header.css";
import logo from "../../asset/logo/PetFoster-Logo.png"
import logoUser from "../../asset/logo/user.svg"
import Nav from '../Nav/Nav.tsx';
import { IAnimal } from "../../@types/animal";
import { IAssociationUser } from "../../@types/association";
import { IFilterAnimal } from "../../@types/filter";
import { IFilterAssociation } from "../../@types/filter";
import { useAuth } from "../AuthContext/AuthContext.tsx";
import { useDeconnexion } from "../../utils/deconnexion.ts";
import { IUser } from "../../@types/user";

interface IHeaderProps {
    setEntityFilter: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociationUser[]>>
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

    const photo = user?.family?.profile_photo || user?.association?.profile_photo;
    const profilePhoto = ((photo?.startsWith("http") || photo?.startsWith("blob")) ? photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${photo}`);

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
                        {isAuthenticated &&
                            <NavLink to={"/mon-espace/mon-profil"} className="headerConnectionLink">
                                <img src={profilePhoto || logoUser} alt="photo de profil" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = logoUser;
                                }}/>
                                <p>Bonjour {user?.firstname} / Profil</p>
                            </NavLink>}
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