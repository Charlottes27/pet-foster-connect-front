import { Outlet } from "react-router-dom";

import "./MySpacePage.css";
import NavAsideProfil from "../../components/NavAsideProfil/NavAsideProfil";

function MySpacePage () {
    return (
        <main>
            <NavAsideProfil />
            <Outlet />
        </main>
    );
};

export default MySpacePage;