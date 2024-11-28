import { Routes, Route } from "react-router-dom"
import { useState } from "react";

import './App.css';
import { IAnimal } from "../@types/animal";
import { IAssociation } from "../@types/association";

import Header from "../components/Header/Header.tsx";
import Footer from '../components/Footer/Footer.tsx';
import HomePage from "../pages/HomePage/HomePage.tsx";
import ListPage from "../pages/ListPage/ListPage.tsx";
import DetailPage from "../pages/DetailPage/DetailPage.tsx"
import ConnexionPage from "../pages/ConnexionPage/ConnexionPage.tsx"

function App() {
    const [entityFilter, setEntityFilter] =useState<IAnimal[] | IAssociation[]>([]);
    const [filterAnimal, setFilterAnimal] = useState({species: "", gender:"", ageRange: "all", size: "",})
    const [filterAssociation, setFilterAssociation] = useState({nameAssociation: "", city: ""});


    return (
        <>
            <Header setEntityFilter={setEntityFilter} setFilterAnimal={setFilterAnimal} setFilterAssociation={setFilterAssociation}/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/animaux" element={<ListPage entityFilter={entityFilter} setEntityFilter={setEntityFilter} filterAnimal={filterAnimal} setFilterAnimal={setFilterAnimal} filterAssociation={filterAssociation} setFilterAssociation={setFilterAssociation}/>} />
                <Route path="/animal/:id" element={<DetailPage />} />
                <Route path="/associations" element={<ListPage entityFilter={entityFilter} setEntityFilter={setEntityFilter} filterAnimal={filterAnimal} setFilterAnimal={setFilterAnimal} filterAssociation={filterAssociation} setFilterAssociation={setFilterAssociation}/>} />
                <Route path="/association/:id" element={<DetailPage />} />
                <Route path="/connexion-inscription" element={<ConnexionPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
