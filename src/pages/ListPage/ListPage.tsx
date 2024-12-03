import { useLocation, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

import APIAnimal from "../../services/api/animal.ts";

import "./ListPage.css"
import Filter from "../../components/Filter/Filter.tsx"
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton.tsx";
import ListEntities from "../../components/ListEntities/ListEntities.tsx";
import { IAnimal } from "../../@types/animal.ts";
import { IAssociation } from '../../@types/association.ts'
import { IFilterAnimal } from "../../@types/filter";
import { IFilterAssociation } from "../../@types/filter";
import { IUser } from "../../@types/user";
import APIAssociation from "../../services/api/associations.ts";
import APIFamily from "../../services/api/family.ts";

interface IListPageProps {
    entityData: IAnimal[] | IAssociation[]
    setEntityData: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociation[]>>
    entityFilter?: IAnimal[] | IAssociation[]
    setEntityFilter?: React.Dispatch<React.SetStateAction<IAnimal[] | IAssociation[]>>
    filterAnimal?: IFilterAnimal
    setFilterAnimal?: React.Dispatch<React.SetStateAction<IFilterAnimal>>
    filterAssociation?: IFilterAssociation
    setFilterAssociation?: React.Dispatch<React.SetStateAction<IFilterAssociation>>
    user?: IUser | null
}

function ListPage ({entityData, setEntityData, entityFilter, setEntityFilter, filterAnimal, setFilterAnimal, filterAssociation, setFilterAssociation, user}: IListPageProps) {
    const location = useLocation()!;
    const title = location.pathname.slice(1);
    const upperTitle = title?.charAt(0).toUpperCase() + title?.slice(1);

    const mobile = useMediaQuery({query: "(max-width: 740px)"});

    const [openFilter, setOpenFilter] = useState(false);
             
    return (
        <main className={mobile ? "mainMobile" : "mainDestop"}>

            {mobile && <NavLink to={"#"} className="filterNavMobile" onClick={()=>setOpenFilter(true)}>Filtre</NavLink>}

            <Filter openFilter={openFilter} setOpenFilter={setOpenFilter}
                entityData={entityData}
                setEntityFilter={setEntityFilter!} 
                title={title}
                filterAnimal={filterAnimal!} setFilterAnimal={setFilterAnimal!}
                filterAssociation={filterAssociation!} setFilterAssociation={setFilterAssociation!}
            />
        
            <div className="listAndTitle">
                <h1 className="titleMain">{(user?.role) ? "Liste de mes animaux" : `Liste des ${upperTitle}`}</h1>
                <ScrollToTopButton />
               <ListEntities entityFilter={entityFilter} entityData={entityData} setEntityData={setEntityData}/>
            </div>
        </main>
    );

};

export default ListPage;