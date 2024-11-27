import { Routes, Route } from "react-router-dom"
import { useState } from "react";

import './App.css';

import Header from "../components/Header/Header.tsx";
import Footer from '../components/Footer/Footer.tsx';
import HomePage from "../pages/HomePage/HomePage.tsx";
import ListPage from "../pages/ListPage/ListPage.tsx";
import ConnexionPage from "../pages/ConnexionPage/ConnexionPage.tsx"

function App() {
    const [openMenuBurger, setOpenMenuBurger] = useState(false);
  

    return (
        <>
            <Header openMenuBurger={openMenuBurger} setOpenMenuBurger={setOpenMenuBurger}/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/animaux" element={<ListPage />} />
                <Route path="/associations" element={<ListPage />} />
                <Route path="/connexion-inscription" element={<ConnexionPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
