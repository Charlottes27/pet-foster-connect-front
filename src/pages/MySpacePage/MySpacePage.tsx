import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import "./MySpacePage.css";
import NavAsideProfil from "../../components/NavAsideProfil/NavAsideProfil";
import { IUser } from "../../@types/user";

interface IMySpacePageProps {
    user: IUser
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

function MySpacePage ({user, setUser}:IMySpacePageProps) {
    const location = useLocation()!;
    const title = location.pathname.slice(1);
    const [openNavProfil, setOpenNavProfil] = useState(false);

    const mobile = useMediaQuery({query: "(max-width: 740px)"});

    return (
        <main className="mainSpacePage">
            {mobile && <NavLink to={"#"} className="btnNavProfilMobile" onClick={()=>setOpenNavProfil(true)}>Menu de mon profil</NavLink>}
            <NavAsideProfil openNavProfil={openNavProfil} setOpenNavProfil={setOpenNavProfil} />
            <div className="sectionMainSpacePage">
                {title === "mon-espace/mes-animaux" && <h2>Liste de mes animaux</h2>}
                <Outlet context={{user, setUser}}/>
            </div>
        </main>
    );
};

export default MySpacePage;