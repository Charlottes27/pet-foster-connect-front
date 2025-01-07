import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./Card.css"
import { IAnimal } from "../../@types/animal.ts";
import { IAssociation } from "../../@types/association";
import APIAnimal from "../../services/api/animal.ts";

interface ICardProps {
    entity: IAnimal | IAssociation
    title: string
    isCardAnimalCRUD?: boolean
    setModalModifiedAnimal?: React.Dispatch<React.SetStateAction<boolean>>
    setSuccessMessage?: React.Dispatch<React.SetStateAction<string | null>>
    setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
    entityData?: IAnimal[] 
    setEntityData?: React.Dispatch<React.SetStateAction<IAnimal[]>>
    setDetailOfOneAnimal?: React.Dispatch<React.SetStateAction<IAnimal>>
}

function Card ({entity, title, isCardAnimalCRUD, setModalModifiedAnimal, setSuccessMessage, setErrorMessage, entityData, setEntityData, setDetailOfOneAnimal}: ICardProps) {
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

    const deletedAnimal = async () => {
        try {
            await APIAnimal.deleteAnimal(entity.id!);
            setSuccessMessage!("Suppression réussie")
            setEntityData!(prevData => prevData.filter(item => item.id !== entity.id))
            
        } catch (error) {
            console.log(error);
            setErrorMessage!("Problème lors de la suppression")
        }
    };

    return (
        <article className={isCardAnimalCRUD ? "card cardAnimalCRUD" : "card"}   style={isAnimal(entity) ? {border: "3px solid var(--green-color)"} : isAssociation(entity) ? {border: "3px solid var(--orange-color)"} : {border: "3px solid var(--blue-color)"}}>
            {isCardAnimalCRUD &&
                <div className="dashboardAsso">
                    <div className="faPencil" >
                        <button type="button" onClick={()=>{setModalModifiedAnimal!(true); setDetailOfOneAnimal!(entity)}}><FontAwesomeIcon icon={faPencil}/></button>
                    </div>
                    <div className="faTrashCan" >
                        <button type="button" onClick={deletedAnimal}><FontAwesomeIcon icon={faTrashCan}/></button>
                    </div>
                </div>
            }
            <NavLink to={`/${title in pathMap && pathMap[title as keyof typeof pathMap]}/${entity.id}`} className="LinkToDetail"  >
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
            </NavLink>
        </article>
    );
};

export default Card;