import { Routes, Route } from "react-router-dom"

import './App.css';

import Header from "../components/Header/Header.tsx";
import Footer from '../components/Footer/Footer.tsx';
import HomePage from "../pages/HomePage/HomePage.tsx";
import ListPage from "../pages/ListPage/ListPage.tsx";

function App() {
  

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/animaux" element={<ListPage />} />
                <Route path="/associations" element={<ListPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
