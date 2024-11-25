import { useLocation} from "react-router-dom";

import "./ListPage.css"
import Card from "../../components/Card/Card";

function AnimalsPage () {
    const location = useLocation()!;
    const title = location.pathname.slice(1);
    const upperTitle = title?.charAt(0).toUpperCase() + title?.slice(1);

    return (
        <main>
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
        </main>
    );

};

export default AnimalsPage