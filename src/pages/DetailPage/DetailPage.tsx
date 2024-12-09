import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import "./DetailPage.css";
import Slider from "../../components/Slider/Slider.tsx";
import APIAnimal from "../../services/api/animal.ts";
import { IAnimal } from "../../@types/animal";
import APIAssociation from "../../services/api/associations.ts";
import { IAssociation } from "../../@types/association";

function DetailPage () {
    const location = useLocation();
    const titleUrl = location.pathname.match(/^\/([^/]+)/)?.[1];
        // ^\/ correspond au début de la chaîne et au premier slash.
        // ([^/]+) capture tous les caractères jusqu'au prochain slash.
        // Le ?.[1] récupère le premier groupe capturé (s'il existe).

    const { id } = useParams();
    const idEntity = parseInt(id!, 10);

    const [animal, setAnimal] = useState<IAnimal | null>(null);
    const [association, setAssociation] = useState<IAssociation | null>(null);

    const navigate = useNavigate();

    useEffect(()=>{
        const entity = async () => {
            try {
                if (titleUrl === "animal") {
                    const response = await APIAnimal.getAnimal(idEntity);
                    setAnimal(response.data)
                };
                if(titleUrl === "association") {
                    const response = await APIAssociation.getAssociation(idEntity);
                    setAssociation(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        entity();
    }, [titleUrl, idEntity]);


    const associationId = animal?.id_association;

    const navigateDetailAsso = () => {
        setAnimal(null);
        navigate(`/association/${associationId}`);
    };

    const navigateOnAnimalsListAsso = () => {
        setAssociation(null);
        navigate(`/association/${associationId}/animaux`);
    };

    return (
        <main>
            <article className="entityDetails">
                <div className="headerArticle">
                    <Slider entity={animal! || association!} idEntity={idEntity}/>
                </div>
                
                <p id="titleArticle">{animal?.name || association?.representative}</p>

                {animal && 
                <>
                    <p id="speciesArticle"><span>Espèce : </span> {animal?.species}</p>
                    <p id="breedArticle"><span>Race : </span> {animal?.breed} </p>
                    <p id="ageArticle"><span>Age : </span> {animal?.age} ans</p>
                    <p id="genderArticle"><span>Sexe : </span>{animal?.gender === "M" ? "Mâle" : "Femelle"} </p>
                    <p id="sizeArticle"><span>Taille : </span> {animal?.size}</p>
                    <p id="localisationArticle"><span>Localisation : </span> Mont Saint Michel</p>
                </>}

                {association &&
                <>
                    <p className="pAssociationDetail" id="representativeArticle"><span> Représentant : </span>{association?.user.firstname} {" "} {association?.user.lastname}</p>
                    <p className="pAssociationDetail" id="rnaNumberArticle"><span>Numéro RNA : </span>{association?.rna_number}</p>
                    <p className="pAssociationDetail" id="addressArticle"><span>Adresse : </span>{association?.address} {" "} {association?.postal_code} {" "} {association?.city}</p>
                    <p className="pAssociationDetail" id="phoneArticle"><span>Téléphone : </span>{association?.phone}</p>
                    <p className="pAssociationDetail" id="emailArticle"><span>Mail : </span>{association?.user.email}</p>
                </>}

                <p id="descriptionArticle"><span>Description : </span>{animal?.description || association?.description}</p>

                <div className="ctaAnimalPage">
                    {animal && <button >Je me propose famille d'accueil</button>}
                    <button onClick={navigateDetailAsso}>Contacter l'association</button>
                    {association && <button onClick={navigateOnAnimalsListAsso}>Les animaux de l'association</button>}
                </div>
            </article>
        </main>
    );
};

export default DetailPage;