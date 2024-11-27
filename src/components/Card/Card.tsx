import { NavLink } from "react-router-dom";

import "./Card.css"
import { IAnimal } from "../../@types/animal.ts";

interface ICardProps {
    animal: IAnimal
}

function Card ({animal}: ICardProps) {
    return (
        <NavLink to={`/animal/${animal.id}`} className="LinkToDetail">
            <article className="card" style={{border: "3px solid var(--blue-color)"}}>
                <div className="sectionCardImg">
                    <img src={`${import.meta.env.VITE_BASE_URL_PUBLIC}/${animal.profile_photo}`} alt={animal.name} className="animalPhoto"/>
                </div>
                <div className="sectionCardText">
                    <p><span>Nom :</span> {animal.name}</p>
                    <p><span>Espèce :</span> {animal.species}</p>
                    <p><span>Localisation :</span> </p>
                    <p><span>Disponible :</span> {!animal.id_family ? "Oui" : "Non"}</p>
                </div>
            </article>
        </NavLink>
    );
};

export default Card;