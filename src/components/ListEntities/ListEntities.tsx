import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./ListEntities.css";
import Card from "../../components/Card/Card.tsx";
import { IAnimal } from "../../@types/animal.ts";
import { IAssociation } from '../../@types/association.ts'
import { IUser } from "../../@types/user";
import APIAnimal from "../../services/api/animal.ts";
import APIAssociation from "../../services/api/associations.ts";
import APIFamily from "../../services/api/family.ts";
import Toast from "../Toast/Toast.tsx";
import FormAnimal from "../Formulaires/FormAnimal/FormAnimal.tsx";

interface IListEntitiesProps {
    entityFilter?: IAnimal[] | IAssociation[]
    entityData: IAnimal[] | IAssociation[]
    setEntityData: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociation[]>>
    user?: IUser | null
}

function ListEntities ({entityFilter, entityData, setEntityData, user}:IListEntitiesProps) {
    const [isInfoEditMode, setIsInfoEditMode] = useState(false);
    const [createdAnimal, setCreatedAnimal] = useState(false)
    const [isCardAnimalCRUD, setIsCardAnimalCRUD] = useState(false);
    const [modalModifiedAnimal, setModalModifiedAnimal] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [detailOfOneAnimal, setDetailOfOneAnimal] = useState <IAnimal>({
        name: '',
        species: '',
        breed: '',
        gender: '',
        age: 0,
        size: '',
        description: '',
        profile_photo: '',
        photo1: '',
        photo2: '',
        photo3: '',
    })

    const location = useLocation()!;
    const title = location.pathname.slice(1);
    const idUrl = title.split("/");
    const id = parseInt(idUrl[1], 10);

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

        const associationId = user?.id_association || user?.association?.id || id;
        if ((title === "mon-espace/mes-animaux") && (user?.role === "association") && associationId) {
            const Animals = async () => {
                try {
                    const response = await APIAssociation.getAnimalsOfAsso(associationId);
                    setEntityData(response.data);
                    setIsCardAnimalCRUD(true);
                } catch (error) {
                    console.log(error);
                }
            }
            Animals();
        }

        if ( associationId && title === `association/${associationId}/animaux`) {
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

    },[title, user, detailOfOneAnimal]);
    
    const AddAnimal = () => {
        setModalModifiedAnimal(true);
        setDetailOfOneAnimal({
            name: '',
            species: '',
            breed: '',
            gender: '',
            age: 0,
            size: '',
            description: '',
            profile_photo: '',
            photo1: '',
            photo2: '',
            photo3: '',
        });
        setIsInfoEditMode(true);
        setCreatedAnimal(true);
    };
    

    return (
        <section className="listEntities">
            {isCardAnimalCRUD && 
                <button type="button" className="card cardAnimalCRUD" style={{border: "3px solid var(--green-color)"}} onClick={AddAnimal}>
                    <div className="sectionCardAdd">
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div className="sectionCardText">
                        <p className="pAddAnimal">Ajouter un animal</p>
                    </div>
                </button>
            }
            {entityFilter?.length! > 0 ? (
                entityFilter?.map((entity)=>(
                    <Card key={entity.id} entity={entity} title={title!} />
                )) 
            ) : entityData?.length! >0 ? (
                entityData?.map((entity)=>(
                    <Card key={entity.id} entity={entity} title={title!} isCardAnimalCRUD={isCardAnimalCRUD} setModalModifiedAnimal={setModalModifiedAnimal} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} setEntityData={setEntityData as React.Dispatch<React.SetStateAction<IAnimal[]>>} setDetailOfOneAnimal={setDetailOfOneAnimal} />
                ))
            ) : (
                <p className="errorSearch">Aucun résultat pour votre recherche</p>
            )}

            {modalModifiedAnimal && <FormAnimal detailOfOneAnimal={detailOfOneAnimal} setModalModifiedAnimal={setModalModifiedAnimal} createdAnimal={createdAnimal} setCreatedAnimal={setCreatedAnimal} isInfoEditMode={isInfoEditMode} setIsInfoEditMode={setIsInfoEditMode} setDetailOfOneAnimal={setDetailOfOneAnimal} />}

            {successMessage && <Toast setToast={setSuccessMessage} message={successMessage} type="success" />}
            {errorMessage && <Toast setToast={setErrorMessage} message={errorMessage} type="error" />}
        </section>
    )
};

export default ListEntities;