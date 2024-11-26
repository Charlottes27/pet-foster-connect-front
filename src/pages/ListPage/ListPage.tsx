import { useLocation, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import "./ListPage.css"
import Card from "../../components/Card/Card.tsx";
import Filter from "../../components/Filter/Filter.tsx"

function AnimalsPage () {
    const mobile = useMediaQuery({query: "(max-width: 740px)"})
    const location = useLocation()!;
    const title = location.pathname.slice(1);
    const upperTitle = title?.charAt(0).toUpperCase() + title?.slice(1);

    return (
        <main className={mobile ? "mainMobile" : "mainDestop"}>
            {mobile && <NavLink to={"#"} className="filterNavMobile">Filtre</NavLink>}
            <Filter />
            <div className="listAndTitle">
                <h1 className="titleMain">Liste des {upperTitle}</h1>
                <section className="listAnimals">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </section>
            </div>
        </main>
    );

};

export default AnimalsPage