import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

import "./Filter.css"

function Filter () {
    const mobile = useMediaQuery({query: "(max-width:740px"});

    return (
        <aside className={mobile ? "filterMobile" : "filterDestop" }>
            <div className="containerFilter">   
                {mobile ? 
                    <button type="button" className="closeButton">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                :
                    <button id="reset-filters-btn" className="reset-btn">  {/* onClick={resetFilters} */} 
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button>
                }
                <h2>Filtres</h2>

                <select name="species" value="">  {/* onChange={handleFilterChange} */} 
                    <option value="">Filtrer par espèce</option>
                    <option key="1" value="dog">chien</option>
                    <option key="2" value="cat">Chat</option>
                </select>

                <select name="gender" value="">  {/* onChange={handleFilterChange} */} 
                    <option value="all">Filtrer par genre</option>
                    <option value="M">Mâle</option>
                    <option value="F">Femelle</option>
                </select>


                <select name="ageRange" value="" > {/* onChange={handleFilterChange} */} 
                    <option value="all">Filtrer par âge</option>
                    <option value="under-2">Moins de 2 ans</option>
                    <option value="2-7">Entre 2 et 7 ans</option>
                    <option value="over-7">Plus de 7 ans</option>
                </select>

                <select name="size" value="">  {/* onChange={handleFilterChange} */}
                    <option value="">Filtrer par taille</option>
                    <option key="1" value="small">Petit</option>
                    <option key="2" value="medium">Moyen</option>
                    <option key="3" value="tall">Grand</option>
                    <option key="4" value="veryTall">Très Grand</option>
                </select>

                <select name="localisation" value="">  {/* onChange={handleFilterChange} */}
                    <option value="">Filtrer par localisation</option>
                    <option key="1" value="small">Paris</option>
                    <option key="2" value="medium">Lyon</option>
                    <option key="3" value="tall">Vexin sur Epte</option>
                    <option key="4" value="veryTall">Brest</option>
                </select>
                
                <div className="buttonFilter">
                {mobile ? 
                    <button id="reset-filters-btn" className="reset-btn">  {/* onClick={resetFilters} */} 
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button>
                : "" }
        
                    <button id="apply-filters-btn" > {/* onClick={applyFilters} */}
                    <FontAwesomeIcon icon={faCheck} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Filter;