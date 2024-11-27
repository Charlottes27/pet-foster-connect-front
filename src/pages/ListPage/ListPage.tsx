import { useLocation, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

import APIAnimal from "../../services/api/animal.ts";

import "./ListPage.css"
import Card from "../../components/Card/Card.tsx";
import Filter from "../../components/Filter/Filter.tsx"
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton.tsx";
import { IAnimal } from "../../@types/animal.ts";

function AnimalsPage () {
    const location = useLocation()!;
    const title = location.pathname.slice(1);
    const upperTitle = title?.charAt(0).toUpperCase() + title?.slice(1);
    const mobile = useMediaQuery({query: "(max-width: 740px)"})

    const [openFilter, setOpenFilter] = useState(false);
    const [animalsData, setAnimalsData] =useState<IAnimal[]>([]);
    

    useEffect(()=>{
        if(title === "animaux") {
            const Animals = async () => {
                try {
                    const response = await APIAnimal.getAnimals();
                    setAnimalsData(response.data)
                } catch (error) {
                    console.log("Erreur lors de la récupération des animaux :", error)
                }
            }
            Animals();
        }
    },[title]);


    return (
        <main className={mobile ? "mainMobile" : "mainDestop"}>

            {mobile && <NavLink to={"#"} className="filterNavMobile" onClick={()=>setOpenFilter(true)}>Filtre</NavLink>}

            <Filter openFilter={openFilter} setOpenFilter={setOpenFilter} animalsData={animalsData} setAnimalsData={setAnimalsData}/>

            <div className="listAndTitle">
                <h1 className="titleMain">Liste des {upperTitle}</h1>
                <ScrollToTopButton />
                <section className="listAnimals">
                    {animalsData.length >0 ? (
                        animalsData.map((animal)=>(
                            <Card key={animal.id} animal={animal}/>
                        ))
                    ) : (
                        <p className="errorSearch">Aucun résultat pour votre recherche</p>
                    )}
                </section>
            </div>
        </main>
    );

};

export default AnimalsPage