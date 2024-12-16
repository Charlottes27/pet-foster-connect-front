import { NavLink } from "react-router-dom";

import "./Card.css"
import { IAnimal } from "../../@types/animal.ts";
import { IAssociation } from "../../@types/association";

interface ICardProps {
    entity: IAnimal | IAssociation
    title: string
}

function Card ({entity, title}: ICardProps) {
    const idUrl = title.split("/");
    const id = parseInt(idUrl[1], 10);
    
    const pathMap = {
        "animaux" : "animal",
        "associations" : "association",
        "mon-espace/mes-animaux" : "animal",
        [`association/${id}/animaux`] : "animal"
    }

    const isAnimal = (entity: IAnimal | IAssociation): entity is IAnimal => {
        return "species" in entity;
    };
    const isAssociation = (entity: IAnimal | IAssociation): entity is IAssociation => {
        return "rna_number" in entity;
    };

    const numberAnimalsAssoDispo = (animals: IAnimal[]) => {
        const result = animals.filter((animal: IAnimal) => animal.id_family === null).length
        return result;
    };

    const photo = entity.profile_photo;

    return (
        <NavLink to={`/${title in pathMap && pathMap[title as keyof typeof pathMap]}/${entity.id}`} className="LinkToDetail">
            <article className="card" style={{border: "3px solid var(--blue-color)"}}>
                <div className="sectionCardImg">
                    <img src={photo?.startsWith("http") ? photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${photo}`} alt={isAnimal(entity) ? entity.name : (isAssociation(entity) ? entity.representative : '')} className="animalPhoto"/>
                </div>
                <div className="sectionCardText">

                    {isAnimal(entity) &&
                    (<>
                        <p><span>Nom : </span> {entity.name}</p>
                        <p><span>Espèce : </span> {entity.species}</p>
                        <p><span>Localisation : </span> </p>
                        <p><span>Disponible : </span> {!entity.id_family ? "Oui" : "Non"}</p>
                    </>)}
                    {isAssociation(entity) &&
                    (<>
                        <p><span>Association : </span>{entity.representative}</p>
                        <p><span>Ville : </span>{entity.city}</p>
                        <p><span>Animaux disponibles : </span>{numberAnimalsAssoDispo(entity.animals!)}</p>
                    </>)}
                </div>
            </article>
        </NavLink>
    );
};

export default Card;