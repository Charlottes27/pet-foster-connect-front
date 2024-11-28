import "./InputAsso.css";
import { IFilterAssociation } from "../../../../@types/filter";

interface IInputAssoProps {
    filterAssociation: IFilterAssociation
    nameAssociations: string[]
    cities: string[]
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function InputAsso ({filterAssociation, nameAssociations, cities, handleFilterChange}: IInputAssoProps) {
    return (
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
        </>
    );
};

export default InputAsso;