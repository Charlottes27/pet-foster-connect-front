import { useState, useEffect } from "react";

import "./ConnexionPage.css";
import FormConnexion from "../../components/Formulaires/FormConnexion/FormConnexion";
import FormInscrFa from "../../components/Formulaires/FormInscription/Famille/FormInscFa";
import FormInscAsso from "../../components/Formulaires/FormInscription/Association/FormInscAsso";
import { IUser } from "../../@types/user";


interface IConnexionPageProps {
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

function ConnexionPage ({setUser}: IConnexionPageProps) {
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
                <FormConnexion setUser={setUser}/>

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

                <FormInscrFa openFormFa={openFormFa} setOpenFormFa={setOpenFormFa} setUser={setUser} />

                <FormInscAsso openFormAsso={openFormAsso} setOpenFormAsso={setOpenFormAsso} setUser={setUser} />

        </main>
    )
};

export default ConnexionPage;