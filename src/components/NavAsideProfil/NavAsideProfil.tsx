import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faAddressCard, faPaw, faEnvelope, faXmark} from "@fortawesome/free-solid-svg-icons";
import { NavLink} from "react-router-dom";

import "./NavAsideProfil.css";

interface INavAsideProfil {
    openNavProfil: boolean
    setOpenNavProfil: React.Dispatch<React.SetStateAction<boolean>>
}

function NavAsideProfil ({openNavProfil, setOpenNavProfil}: INavAsideProfil) {

    const mobile = useMediaQuery({query: "(max-width:740px"});
    const linksFa = [
        { name: "Mes informations", href: "/mon-espace/mon-profil", icon: faAddressCard },
        { name: "Mes animaux", href: "/mon-espace/mes-animaux", icon: faPaw },
        { name: "Les demandes d'accueil", href: "/mon-espace/les-demandes-d'accueil", icon: faCommentDots},
        { name: "Ma messagerie", href: "#", icon: faEnvelope}
    ];

    return (
        <aside className={mobile ? (openNavProfil ? "navProfilMobile active" : "navProfilMobile") : "navProfilDestop"}>
            <div className="containerLinks">
            {mobile &&
                <button type="button" className="closeButton" onClick={()=>setOpenNavProfil(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            }
            {linksFa.map(({name, href, icon}, index) => (
                <NavLink to={href} key={`${name}-${index}`} className="linkNavProfil" onClick={()=>setOpenNavProfil(false)}>
                    <FontAwesomeIcon icon={icon} className="iconNavProfil"/> {name}
                </NavLink>

            ))}

            </div>
        </aside>
    );
};

export default NavAsideProfil;