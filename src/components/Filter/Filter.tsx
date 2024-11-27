import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

import "./Filter.css"
import { IAnimal } from "../../@types/animal";
import API from "../../services/api/animal.ts"

interface IFilterProps {
    openFilter: boolean
    setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
    animalsData: IAnimal[]
    setAnimalsData: React.Dispatch<React.SetStateAction<IAnimal[]>>
}

function Filter ({openFilter, setOpenFilter, animalsData, setAnimalsData}: IFilterProps) {
    const mobile = useMediaQuery({query: "(max-width:740px"});

    const [isLoading, setIsLoading] = useState(true);

    const [filterAnimal, setFilterAnimal] = useState({species: "", gender:"", ageRange: "all", size: "",})
    const [species, setSpecies] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);


    useEffect(()=>{
        const loadAnimals = () => {
            try {
                setIsLoading(true);
                
                const uniqueSpecies = Array.from(
                new Set(animalsData.map((animal: IAnimal) => animal.species))
                ).filter((species): species is string => typeof species === "string");
        
                const uniqueSizes = Array.from(
                new Set(animalsData.map((animal: IAnimal) => animal.size))
                ).filter((size): size is string => typeof size === "string");
            
        
                setSpecies(uniqueSpecies);
                setSizes(uniqueSizes);
              
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
          };
      
          loadAnimals();
      
    },[animalsData]);

    const applyFilters = () => {
        let filtered = [...animalsData];
    
        if (filterAnimal.species) {
            filtered = filtered.filter((animal) =>
            animal.species.toLowerCase().includes(filterAnimal.species.toLowerCase())
            );
        }
    
        if (filterAnimal.size) {
            filtered = filtered.filter((animal) =>
            animal.size.toLowerCase().includes(filterAnimal.size.toLowerCase())
            );
        }
    
        if (filterAnimal.ageRange !== "all") {
            if (filterAnimal.ageRange === "under-2") {
            filtered = filtered.filter((animal) => animal.age < 2);
            } else if (filterAnimal.ageRange === "2-7") {
            filtered = filtered.filter(
                (animal) => animal.age >= 2 && animal.age <= 7
            );
            } else if (filterAnimal.ageRange === "over-7") {
            filtered = filtered.filter((animal) => animal.age > 7);
            }
        }
    
        // Filtrer par genre (M ou F)
        if (filterAnimal.gender) {
            filtered = filtered.filter((animal) => animal.gender === filterAnimal.gender);
        }
      
        setAnimalsData(filtered);
        setOpenFilter(false)
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterAnimal((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
    };
    
    const resetFilters = async () => {
        setFilterAnimal({
          species: "",
          gender:"",
          ageRange: "all",
          size: "",
          
        });
        // setFilteredAnimals(animals);
        const response = await API.getAnimals();
        console.log(response);
        
        setAnimalsData(response.data);
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