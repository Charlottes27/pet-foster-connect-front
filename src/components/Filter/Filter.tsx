import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import "./Filter.css"
import { IAnimal } from "../../@types/animal";
import { IAssociation } from "../../@types/association";
import APIAnimal from "../../services/api/animal.ts"
import APIAssociation from "../../services/api/associations.ts";

interface IFilterProps {
    openFilter: boolean
    setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
    entityData: IAnimal[] | IAssociation[]
    setEntityFilter: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociation[]>>
    title: string
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

function Filter ({openFilter, setOpenFilter, entityData, setEntityFilter, title, filterAnimal, setFilterAnimal, filterAssociation, setFilterAssociation}: IFilterProps) {
    const [isLoading, setIsLoading] = useState(true);

    const [species, setSpecies] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);

    const [nameAssociations, setNameAssociations] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    useEffect(()=>{
        if (title === "animaux") {
            const loadAnimals = () => {
                try {
                    setIsLoading(true);

                    if (isAnimal(entityData)) {
                        const uniqueSpecies = Array.from(
                        new Set(entityData.map((animal: IAnimal) => animal.species))
                        ).filter((species): species is string => typeof species === "string");
                
                        const uniqueSizes = Array.from(
                        new Set(entityData.map((animal: IAnimal) => animal.size))
                        ).filter((size): size is string => typeof size === "string");
                    
                        setSpecies(uniqueSpecies);
                        setSizes(uniqueSizes);
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };
            loadAnimals();
        }

        if (title === "associations") {
            const loadAssociations = () => {
                try {
                    setIsLoading(true);
                    
                    if (isAssociation(entityData)) {
                        const uniqueAssociations = Array.from(
                        new Set(entityData.map((association: IAssociation) => association.representative))
                        ).filter((representative): representative is string => typeof representative === "string");

                        const uniqueCities = Array.from(
                        new Set(entityData.map((association: IAssociation) => association.city))
                        ).filter((city): city is string => typeof city === "string");

                        setNameAssociations(uniqueAssociations);
                        setCities(uniqueCities);
                    }
                } catch (error) {
                    
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };
            loadAssociations();
        }

    },[entityData]);

    const navigate = useNavigate();

    const mobile = useMediaQuery({query: "(max-width:740px"});

    const isAnimal = (entityData: IAnimal[] | IAssociation[]): entityData is IAnimal[] => {
        return entityData.length > 0 && 'species' in entityData[0];
    };
    const isAssociation = (entityData: IAnimal[] | IAssociation[]): entityData is IAssociation[] => {
        return entityData.length > 0 && "rna_number" in entityData[0];
    };

    const applyFilters = () => {
        const filtered = [...entityData];
    
        if (filtered.length > 0 && "species" in filtered[0]) {
            let animals = filtered as IAnimal[];

            if (filterAnimal.species) {
                animals = animals.filter((animal) =>
                animal.species.toLowerCase().includes(filterAnimal.species.toLowerCase())
                );
            }
        
            if (filterAnimal.size) {
                animals = animals.filter((animal) =>
                animal.size.toLowerCase().includes(filterAnimal.size.toLowerCase())
                );
            }
        
            if (filterAnimal.ageRange !== "all") {
                if (filterAnimal.ageRange === "under-2") {
                animals = animals.filter((animal) => animal.age < 2);
                } else if (filterAnimal.ageRange === "2-7") {
                animals = animals.filter(
                    (animal) => animal.age >= 2 && animal.age <= 7
                );
                } else if (filterAnimal.ageRange === "over-7") {
                animals = animals.filter((animal) => animal.age > 7);
                }
            }
        
            // Filtrer par genre (M ou F)
            if (filterAnimal.gender) {
                animals = animals.filter((animal) => animal.gender === filterAnimal.gender);
            }

            setEntityFilter(animals);
            setOpenFilter(false);

            const params = new URLSearchParams();
            if (filterAnimal.species) params.set("espece", filterAnimal.species);
            if (filterAnimal.size) params.set("taille", filterAnimal.size);
            if (filterAnimal.ageRange) params.set("age", filterAnimal.ageRange);
            if (filterAnimal.gender) params.set("genre", filterAnimal.gender);

            navigate({
                pathname: location.pathname,
                search: params.toString()
            })
        }

        if (filtered.length > 0 && "rna_number" in filtered[0]) {
            let associations = filtered as IAssociation[];

            if (filterAssociation.nameAssociation) {
                associations = associations.filter((association) =>
                association.representative.toLowerCase().includes(filterAssociation.nameAssociation.toLowerCase())
                );
            }

            if (filterAssociation.city) {
                associations = associations.filter((association) =>
                association.city.toLowerCase().includes(filterAssociation.city.toLowerCase())
                );
            }

            setEntityFilter(associations);
            setOpenFilter(false);

            const params = new URLSearchParams();
            if (filterAssociation.nameAssociation) params.set("association", filterAssociation.nameAssociation);
            if (filterAssociation.city) params.set("ville", filterAssociation.city);

            navigate({
                pathname: location.pathname,
                search: params.toString()
            })
        }
      
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (entityData.length > 0 && "species" in entityData[0]) {
            setFilterAnimal((prevFilters) => ({
              ...prevFilters,
              [name]: value,
            }));
        }

        if (entityData.length > 0 && "rna_number" in entityData[0]) {
            setFilterAssociation((prevFilters) => ({
              ...prevFilters,
              [name]: value,
            }));
        }
    };
    
    const resetFilters = async () => {
        if (title === "animaux") {
            setFilterAnimal({
              species: "",
              gender:"",
              ageRange: "all",
              size: "",
              
            });
            navigate(location.pathname);
            //const response = await APIAnimal.getAnimals();
            setEntityFilter([]);
        }

        if (title === "associations") {
            setFilterAssociation({nameAssociation: "", city: ""});
            navigate(location.pathname);
            //const response = await APIAssociation.getAssociations();
            setEntityFilter([]);
        }
    };


    return (
        <aside className={mobile ? (openFilter ? "filterMobile active" : "filterMobile") : "filterDestop" }>
            <div className="containerFilter">   
                {mobile ? 
                    <button type="button" className="closeButton" onClick={()=>setOpenFilter(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                :
                    <button id="reset-filters-btn" className="reset-btn" onClick={resetFilters}>
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button>
                }
                <h2>Filtres</h2>

                {title === "animaux" &&

                <>
                    <select name="species" value={filterAnimal.species} onChange={handleFilterChange}>
                        <option value="">Filtrer par espèce</option>
                        {species.map((species)=>(
                            <option key={species} value={species}>{species}</option>
                        ))}                   
                    </select>

                    <select name="gender" value={filterAnimal.gender} onChange={handleFilterChange}> 
                        <option value="all">Filtrer par genre</option>
                        <option value="M">Mâle</option>
                        <option value="F">Femelle</option>
                    </select>


                    <select name="ageRange" value={filterAnimal.ageRange} onChange={handleFilterChange}>
                        <option value="all">Filtrer par âge</option>
                        <option value="under-2">Moins de 2 ans</option>
                        <option value="2-7">Entre 2 et 7 ans</option>
                        <option value="over-7">Plus de 7 ans</option>
                    </select>

                    <select name="size" value={filterAnimal.size} onChange={handleFilterChange}>
                        <option value="">Filtrer par taille</option>
                        {sizes.map((size)=>(
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>

                    {/* <select name="localisation" value="" onChange={handleFilterChange}>
                        <option value="">Filtrer par localisation</option>
                        <option key="1" value="small">Paris</option>
                        <option key="2" value="medium">Lyon</option>
                        <option key="3" value="tall">Vexin sur Epte</option>
                        <option key="4" value="veryTall">Brest</option>
                    </select> */}
                </>}

                {title === "associations" &&
                <>
                    <select name="nameAssociation" value={filterAssociation.nameAssociation} onChange={handleFilterChange}>
                        <option value="">Filtrer par Nom</option>
                        {nameAssociations.map((association)=>(
                            <option key={association} value={association}>{association}</option>
                        ))}                   
                    </select>

                    <select name="city" value={filterAssociation.city} onChange={handleFilterChange}>
                        <option value="">Filtrer par Ville</option>
                        {cities.map((city)=>(
                            <option key={city} value={city}>{city}</option>
                        ))}                   
                    </select>
                </>}
                
                <div className="buttonFilter">
                {mobile ? 
                    <button id="reset-filters-btn" className="reset-btn" onClick={resetFilters}>
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button>
                : "" }
        
                    <button id="apply-filters-btn" onClick={applyFilters}>
                    <FontAwesomeIcon icon={faCheck} />{!mobile && "Appliquer les filtres"}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Filter;