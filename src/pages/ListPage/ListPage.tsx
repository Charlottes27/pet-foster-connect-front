import { useLocation, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

import APIAnimal from "../../services/api/animal.ts";

import "./ListPage.css"
import Card from "../../components/Card/Card.tsx";
import Filter from "../../components/Filter/Filter.tsx"
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton.tsx";
import { IAnimal } from "../../@types/animal.ts";
import { IAssociation } from '../../@types/association.ts'
import APIAssociation from "../../services/api/associations.ts";

interface IListPageProps {
    entityFilter: IAnimal[] | IAssociation[]
    setEntityFilter: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociation[]>>
    filterAnimal: {
        species: string;
        gender: string;
        ageRange: string;
        size: string;
    }
    setFilterAnimal: React.Dispatch<React.SetStateAction<{
        species: string;
        gender: string;
        ageRange: string;
        size: string;
    }>>
    filterAssociation: {
        nameAssociation: string;
        city: string;
    }
    setFilterAssociation: React.Dispatch<React.SetStateAction<{
        nameAssociation: string;
        city: string;
    }>>
}

function ListPage ({entityFilter, setEntityFilter, filterAnimal, setFilterAnimal, filterAssociation, setFilterAssociation}: IListPageProps) {
    const location = useLocation()!;
    const title = location.pathname.slice(1);
    const upperTitle = title?.charAt(0).toUpperCase() + title?.slice(1);

    const mobile = useMediaQuery({query: "(max-width: 740px)"});

    const [openFilter, setOpenFilter] = useState(false);
    const [entityData, setEntityData] =useState<IAnimal[] | IAssociation[]>([]);


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
    },[title]);

// , queryParams.size === 0
// setFilterAnimal({species: "", gender:"", ageRange: "all", size: "",});
// setFilterAssociation({nameAssociation: "", city: ""});
                    
    return (
        <main className={mobile ? "mainMobile" : "mainDestop"}>

            {mobile && <NavLink to={"#"} className="filterNavMobile" onClick={()=>setOpenFilter(true)}>Filtre</NavLink>}

            <Filter openFilter={openFilter} setOpenFilter={setOpenFilter}
                entityData={entityData}
                setEntityFilter={setEntityFilter} 
                title={title}
                filterAnimal={filterAnimal} setFilterAnimal={setFilterAnimal}
                filterAssociation={filterAssociation} setFilterAssociation={setFilterAssociation}/>

            <div className="listAndTitle">
                <h1 className="titleMain">Liste des {upperTitle}</h1>
                <ScrollToTopButton />
                <section className="listAnimals">
                    {entityFilter.length > 0 ? (
                        entityFilter.map((entity)=>(
                            <Card key={entity.id} entity={entity} title={title}/>
                        )) 
                    ) : entityData.length >0 ? (
                        entityData.map((entity)=>(
                            <Card key={entity.id} entity={entity} title={title}/>
                        ))
                    ) : (
                        <p className="errorSearch">Aucun résultat pour votre recherche</p>
                    )}
                </section>
            </div>
        </main>
    );

};

export default ListPage;