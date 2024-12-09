import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./ListEntities.css";
import Card from "../../components/Card/Card.tsx";
import { IAnimal } from "../../@types/animal.ts";
import { IAssociation } from '../../@types/association.ts'
import { IUser } from "../../@types/user";
import APIAnimal from "../../services/api/animal.ts";
import APIAssociation from "../../services/api/associations.ts";
import APIFamily from "../../services/api/family.ts";

interface IListEntitiesProps {
    entityFilter?: IAnimal[] | IAssociation[]
    entityData: IAnimal[] | IAssociation[]
    setEntityData: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociation[]>>
    user?: IUser | null
}

function ListEntities ({entityFilter, entityData, setEntityData, user}:IListEntitiesProps) {
    const location = useLocation()!;
    const title = location.pathname.slice(1);

    useEffect(()=>{
        if(title === "animaux") {
            const Animals = async () => {
                try {
                    const response = await APIAnimal.getAnimals();
                    setEntityData(response.data)
                } catch (error) {
                    console.log("Erreur lors de la récupération des animaux :", error)
                }
            }
            Animals();
        }

        if(title === "associations") {
            const Associations = async () => {
                try {
                    const response = await APIAssociation.getAssociations();
                    setEntityData(response.data);
                } catch (error) {
                    console.log("Erreur lors de la récupération des associations :", error)
                }
            };
            Associations();
        }

        const familyId = user?.id_family || user?.family?.id;
        if ((title === "mon-espace/mes-animaux") && familyId) {
            const Animals = async () => {
                try {
                    const response = await APIFamily.getAnimalsOfFamily(familyId);
                    setEntityData(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            Animals();
        }

        const associationId = user?.id_association || user?.association?.id;
    
        if ((title === "mon-espace/mes-animaux") && (user?.role === "association") && associationId) {
            const Animals = async () => {
                try {
                    const response = await APIAssociation.getAnimalsOfAsso(associationId);
                    setEntityData(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            Animals();
        }

    },[title, user]);
    
    return (
        <section className="listEntities">
            {entityFilter?.length! > 0 ? (
                entityFilter?.map((entity)=>(
                    <Card key={entity.id} entity={entity} title={title!}/>
                )) 
            ) : entityData?.length! >0 ? (
                entityData?.map((entity)=>(
                    <Card key={entity.id} entity={entity} title={title!}/>
                ))
            ) : (
                <p className="errorSearch">Aucun résultat pour votre recherche</p>
            )}
        </section>
    )
};

export default ListEntities;