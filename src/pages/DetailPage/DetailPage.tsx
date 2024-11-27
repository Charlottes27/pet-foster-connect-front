import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import "./DetailPage.css";
import Slider from "../../components/Slider/Slider.tsx";
import APIAnimal from "../../services/api/animal.ts";
import { IAnimal } from "../../@types/animal";

function DetailPage () {
    const location = useLocation();
    const titleUrl = location.pathname.slice(1, -2);

    const { id } = useParams();
    const idEntity = parseInt(id!, 10);

    const [animal, setAnimal] = useState<IAnimal | null>(null);
    

    useEffect(()=>{
        if (titleUrl === "animal") {
            const animal = async () => {
                try {
                    const response = await APIAnimal.getAnimal(idEntity);
                    setAnimal(response.data)
                } catch (error) {
                    console.log(error)
                }
            };
            animal();
        }
    }, [titleUrl || idEntity]);

    return (
        <main>
            <article className="entityDetails">
                <div className="headerArticle">
                    <Slider entity={animal!} idEntity={idEntity}/>
                </div>
                
                    <p id="titleArticle">{animal?.name}</p>
                    <p id="speciesArticle"><span>Espèce : </span> {animal?.species}</p>
                    <p id="breedArticle"><span>Race : </span> {animal?.breed} </p>
                    <p id="ageArticle"><span>Age : </span> {animal?.age} ans</p>
                    <p id="genderArticle"><span>Sexe : </span>{animal?.gender === "M" ? "Mâle" : "Femelle"} </p>
                    <p id="sizeArticle"><span>Taille : </span> {animal?.size}</p>
                    <p id="localisationArticle"><span>Localisation : </span> Mont Saint Michel</p>
                    <p id="descriptionArticle"><span>Description : </span>{animal?.description}</p>
                <div className="ctaAnimalPage">
                    <button >Je me propose famille d'accueil</button>
                    <button >Contacter l'association</button>
                </div>
            </article>
        </main>
    );
};

export default DetailPage;