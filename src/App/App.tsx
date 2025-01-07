import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";

import './App.css';
import { IAnimal } from "../@types/animal";
import { IAssociationUser } from "../@types/association";
import { IFilterAnimal } from "../@types/filter";
import { IFilterAssociation } from "../@types/filter";
import { IUser } from "../@types/user";

import inactivityUserForLogout from "../components/inactivityUserForLogout/inactivityUserForLogout.tsx";
import Header from "../components/Header/Header.tsx";
import Footer from '../components/Footer/Footer.tsx';
import HomePage from "../pages/HomePage/HomePage.tsx";
import ListPage from "../pages/ListPage/ListPage.tsx";
import DetailPage from "../pages/DetailPage/DetailPage.tsx"
import ConnexionPage from "../pages/ConnexionPage/ConnexionPage.tsx"
import MySpacePage from "../pages/MySpacePage/MySpacePage.tsx";
import Profil from "../components/Profil/Profil.tsx";
import ListEntities from "../components/ListEntities/ListEntities.tsx";
import ListAsks from "../components/ListAsks/ListAsks.tsx";
import Page404 from "../pages/Page404/Page404.tsx";
import APIUser from "../services/api/user.ts";

function App() {
    inactivityUserForLogout();

    const [entityData, setEntityData] =useState<IAnimal[] | IAssociationUser[]>([]);
        // Détermine qui est affiché dans la liste, liste de animaux ou des asso?
    const [entityFilter, setEntityFilter] =useState<IAnimal[] | IAssociationUser[]>([]);
        // Détermine la liste à afficher avec l'application des filtres
    const [filterAnimal, setFilterAnimal] = useState<IFilterAnimal>({species: "", gender: "", ageRange: "", size: "" });
    const [filterAssociation, setFilterAssociation] = useState<IFilterAssociation>({ nameAssociation: "",  city: "" });
    const [user, setUser] = useState<IUser | null>(null);
        // Donne, avant le useEffect, les premières infos de qui est connecté (si connexion il y a) (email, id, role, id_family, id_asso)
        //Ensuite les infos complètes
console.log(user);
console.log(entityData);


    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (userId) {
            if (userId) {
                const fetchUserData = async () => {
                    const id = parseInt(userId, 10);
                    try {
                        const response = await APIUser.getUser(id);
                        setUser(response.data);
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchUserData();
            }
        }
      }, [user?.id]);


    return (
        <>
            <Header setEntityFilter={setEntityFilter} setFilterAnimal={setFilterAnimal} setFilterAssociation={setFilterAssociation} user={user} setUser={setUser}/>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/animaux" element={<ListPage
                    entityData={entityData}
                    setEntityData={setEntityData}
                    entityFilter={entityFilter}
                    setEntityFilter={setEntityFilter}
                    filterAnimal={filterAnimal}
                    setFilterAnimal={setFilterAnimal}
                    user={user}/>} 
                />
                <Route path="/animal/:id" element={<DetailPage />} />
                
                <Route path="/associations" element={<ListPage
                    entityData={entityData}
                    setEntityData={setEntityData}
                    entityFilter={entityFilter}
                    setEntityFilter={setEntityFilter}
                    filterAssociation={filterAssociation}
                    setFilterAssociation={setFilterAssociation}
                    user={user}/>} 
                />
                <Route path="/association/:id" element={<DetailPage />} />
                <Route path="/association/:id/animaux" element={<ListPage entityData={entityData} setEntityData={setEntityData} />} />

                <Route path="/connexion-inscription" element={<ConnexionPage setUser={setUser}/>} />

                <Route path="/mon-espace" element={<MySpacePage user={user!} setUser={setUser}/>}>

                    {user?.role === "family" &&
                    <>
                        <Route path="mon-profil" element={<Profil />} />
                        <Route path="mes-animaux" element={<ListEntities entityData={entityData} setEntityData={setEntityData} user={user}/>} />
                    </>
                    }
                    { user?.role === "association" &&
                        <>
                            <Route path="mon-profil" element={<Profil />} />
                            <Route path="mes-animaux" element={<ListEntities entityData={entityData} setEntityData={setEntityData} user={user}/>} />
                            <Route path="les-demandes-d'accueil" element={<ListAsks user={user} />} />
                        </>
                    }
                </Route>

                <Route path="/famille/:id" element={<DetailPage />} />

                <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
