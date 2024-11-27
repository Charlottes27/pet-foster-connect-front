import "./Header.css";
import logo from "../../asset/logo/PetFoster-Logo.png"
import Nav from '../Nav/Nav.tsx';

import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom"


function Header () {
    const mobile = useMediaQuery({query : "(max-width: 480px)"});
    
    return (
        <>
            <header>
                <section className="headerHeader">
                    <img src={logo} alt="Logo de pet foster connect" />
                    {mobile ? 
                    <button type="button" onClick={}>
                        <div className="burger">
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                    </button>
                    :
                    <NavLink to={"#"} className="headerConnectionLink">
                        Connexion / Inscription
                    </NavLink>}
                </section>
                <Nav />
            </header>
        </>
    );
}

export default Header;