import "./InputFa.css";
import { IFilterAnimal } from "../../../../@types/filter";

interface IInputFaProps {
    filterAnimal: IFilterAnimal
    species: string[]
    sizes: string[]
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function InputFa ({filterAnimal, species, sizes, handleFilterChange}: IInputFaProps) {
    return (
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
        </>
    );
};

export default InputFa;