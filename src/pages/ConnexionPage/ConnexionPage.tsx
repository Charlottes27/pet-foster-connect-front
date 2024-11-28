import { useState, useEffect } from "react";

import "./ConnexionPage.css";
import FormConnexion from "../../components/Formulaires/FormConnexion/FormConnexion";
import FormInscrFa from "../../components/Formulaires/FormInscription/Famille/FormInscFa";
import FormInscAsso from "../../components/Formulaires/FormInscription/Association/FormInscAsso";

function ConnexionPage () {
    const [openFormFa, setOpenFormFa] = useState(false);
    const [openFormAsso, setOpenFormAsso] = useState(false);
    const [closeSection, setCloseSection] = useState(false);

    useEffect(()=>{
        if(openFormAsso || openFormFa) {
            setCloseSection(true)
        }
        if(!openFormAsso && !openFormFa) {
            setCloseSection(false)
        }
    },[openFormAsso, openFormFa])
    

    return (
        <main className="mainConnexion">
                <FormConnexion />

                <div className="separator"></div>

                <section className={closeSection ? "choseInscription close" : "choseInscription"}>
                    <h1>Pas encore de compte?</h1>
                    <ul>
                        <li>
                            <p>Vous souhaitez devenir famille d'accueil</p>
                            <p>Clique ici pour vous inscrire : </p>
                            <button type="button" onClick={()=>setOpenFormFa(true)}>Inscription Famille</button>
                        </li>
                        <li>
                            <p>Vous êtes une association protectrice des animaux</p>
                            <p>Clique ici pour vous inscrire : </p>
                            <button type="button" onClick={()=>setOpenFormAsso(true)}>Inscription Association</button>
                        </li>
                    </ul>
                </section>

                <FormInscrFa openFormFa={openFormFa} setOpenFormFa={setOpenFormFa}/>

                <FormInscAsso openFormAsso={openFormAsso} setOpenFormAsso={setOpenFormAsso}/>

        </main>
    )
};

export default ConnexionPage;