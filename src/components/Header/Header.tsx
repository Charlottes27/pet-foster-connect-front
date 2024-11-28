import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom"
import { useState } from "react";

import "./Header.css";
import logo from "../../asset/logo/PetFoster-Logo.png"
import Nav from '../Nav/Nav.tsx';
import { IAnimal } from "../../@types/animal";
import { IAssociation } from "../../@types/association";

interface IHeaderProps {
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

function Header ({setEntityFilter, setFilterAnimal, setFilterAssociation}:IHeaderProps) {
    const mobile = useMediaQuery({query : "(max-width: 480px)"});

    const [openMenuBurger, setOpenMenuBurger] = useState(false);
    
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
                    <NavLink to={"/connexion-inscription"} className="headerConnectionLink">
                        Connexion / Inscription
                    </NavLink>}
                </section>
                <Nav openMenuBurger={openMenuBurger} setOpenMenuBurger={setOpenMenuBurger} setEntityFilter={setEntityFilter} setFilterAnimal={setFilterAnimal} setFilterAssociation={setFilterAssociation}/>
            </header>
        </>
    );
}

export default Header;