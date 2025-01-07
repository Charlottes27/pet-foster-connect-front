import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./ListAsks.css";
import { IUser } from "../../@types/user";
import { IFamilyUser } from "../../@types/family";
import { IAsk, IAskByAnimal } from "../../@types/ask";
import APIAsk from "../../services/api/ask";
import Toast from "../Toast/Toast";

interface IListAsksProps {
    user: IUser | null
}

type AskStatus = "en attente" | "validée" | "terminée" | "rejetée";

function ListAsks ({user}: IListAsksProps) {
    const [animalsAsks, setAnimalsAsks] = useState< IAskByAnimal[] >([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
console.log(animalsAsks);

    const associationId = user?.id_association || user?.association?.id;
    
    useEffect(()=>{
        const fetchAnimals = async () => {
            try {
                const response = await APIAsk.getAks(associationId!) as { data: IAsk[] };;
                const asksByAnimal = response.data.reduce<Record<string, IAskByAnimal>>((acc: Record<string, IAskByAnimal>, ask: IAsk) => {
                    const animalId = ask.animal.id;

                    if(animalId && !acc[animalId]) {
                        acc[animalId] = {
                            animal : ask.animal,
                            asks: {
                                pendingAsks : [],
                                validatedAsks : [],
                                closedAsks : [],
                                rejectedAsks : [],
                            }
                        }
                    }

                    const statusMapping: Record<AskStatus, keyof IAskByAnimal['asks']> = {
                        "en attente": "pendingAsks",
                        "validée": "validatedAsks",
                        "terminée": "closedAsks",
                        "rejetée": "rejectedAsks"
                    };
                    const statusKey = statusMapping[ask.status as AskStatus];
                    
                    if (animalId && statusKey) {
                        acc[animalId].asks[statusKey].push(ask);
                    }
                
                    return acc;
                }, {})

                // Convertir l'objet en tableau si nécessaire
                const sortedAsks = Object.values(asksByAnimal);
                setAnimalsAsks(sortedAsks);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAnimals();
    }, [successMessage]);

    useEffect(()=>{
        const details = document.querySelectorAll<HTMLDetailsElement>('.detailAsksPending');
        const btnAsk = document.querySelectorAll<HTMLElement>(".btnAskspending");
        
        const length = Math.min(details.length, btnAsk.length);

        for (let i = 0; i < length; i++) {
            const detail = details[i];
            const btn = btnAsk[i];

            detail.addEventListener('toggle', () => {
                if (detail.open) {
                    btn.style.marginBottom = '2.5em';
                } else {
                    btn.style.marginBottom = '0';
                }
            });
        }
    }, [animalsAsks])

    const navigate = useNavigate();
    const navigateProfil = (family: IFamilyUser) => {
        navigate(`/famille/${family.id}`)
    };

    const confirmAsk = async (ask: IAsk) => {
        const askId= ask.id;
        
        try {
            const response = await APIAsk.pathAsk(associationId!, askId, {status : "validée"});
            setSuccessMessage("Demande validée !")
            console.log(response);
            
        } catch (error) {
            if(axios.isAxiosError(error)) {
            console.log(error);
            setErrorMessage(`erreur lors de la validation de la demande: ${error.response ? error.response.data.error : "contacter l'administrateur du site si l'erreur persiste"}`)
            }
        }
    };

    const cancelAsk =  async (ask: IAsk) => {
        const askId= ask.id;
        
        try {
            const response = await APIAsk.pathAsk(associationId!, askId, {status : "rejetée"});
            setSuccessMessage("Demande rejetée !")
            console.log(response);
            
        } catch (error) {
            if(axios.isAxiosError(error)) {
            console.log(error);
            setErrorMessage(`erreur lors du rejet de la demande: ${error.response ? error.response.data.error : "contacter l'administrateur du site si l'erreur persiste"}`)
            }
        }
    };

    console.log(animalsAsks);
    

    return (
        <section>
            {animalsAsks.length>0 ? 
                animalsAsks.map((ask, index) => (
                    <div className="tableAsksByAnimal" key={index} >
                        <div className="headerTable table">
                            <div className="img">
                                <img src={ask.animal.profile_photo?.startsWith("http") ? ask.animal.profile_photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${ask.animal.profile_photo}`} alt="photo de l'animal" />
                            </div>
                            <p>{ask.animal.name}</p>
                        </div>
                        <div className="bodyTableRow table">
                            <details>
                                <summary>
                                    <p>Demandes en attentes</p>
                                </summary>
                                {ask.asks.pendingAsks.length>0 && (
                                    ask.asks.pendingAsks.map((askPending, index) => ( 
                                        <div key={index} className="family">
                                            <details className="familyData detailAsksPending">
                                                <summary className="titleOfFamily">
                                                    <div className="firstfamilyInfos">
                                                        <span>Famille: </span>
                                                        <div className="img smallImg">
                                                            <img src={askPending.family.profile_photo?.startsWith("http") ? askPending.family.profile_photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${askPending.family.profile_photo}`} alt="" />
                                                        </div>
                                                        <p>{askPending.family.user?.lastname} {askPending.family.user?.firstname}</p>
                                                    </div>
                                                </summary>
                                                <div className="secondFamilyInfos">
                                                    <p><span>Enfants </span>{askPending.family.number_of_children}</p>
                                                    <p><span>Animaux présent(s) </span>{askPending.family.number_of_animals}</p>
                                                    <p><span>Jardin </span>{askPending.family.garden ? "Oui" : "Non"}</p>
                                                    <p><span>Ville </span>{askPending.family.city}</p>
                                                </div>
                                            </details>
                                            <div className="btnAsk btnAskspending">
                                                <button type="button" className="profilbtn" onClick={()=>navigateProfil(askPending.family)}>Profil</button>
                                                <button type="button" className="cancelBtn" onClick={()=>confirmAsk(askPending)}>Accepter</button>
                                                <button type="button" className="confirmBtn" onClick={()=>cancelAsk(askPending)}>Refuser</button>
                                                    {/* les class cancelBtn et confirmBtn ont un css déjà défini ailleurs, d'ou l'invertion ici */}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </details>
                                <p className="nbForAsks">{ask.asks.pendingAsks.length ? ask.asks.pendingAsks.length : 0}</p>
                        </div>
                        <div className="bodyTableRow table">
                            <details>
                                <summary>
                                    <p>Demandes en cours</p>
                                </summary>
                                {ask.asks.validatedAsks.length>0 && (
                                    ask.asks.validatedAsks.map((askValidated, index) => ( 
                                        <div key={index} className="family">
                                                <div className="firstfamilyInfos detailAsks">
                                                    <span>Famille: </span>
                                                    <div className="img smallImg">
                                                        <img src={askValidated.family.profile_photo?.startsWith("http") ? askValidated.family.profile_photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${askValidated.family.profile_photo}`} alt="" />
                                                    </div>
                                                    <p>{askValidated.family.user?.lastname} {askValidated.family.user?.firstname}</p>
                                                </div>
                                            <div className="btnAsk">
                                                <button type="button" className="profilbtn" onClick={()=>navigateProfil(askValidated.family)}>Profil</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </details>
                                <p className="nbForAsks">{ask.asks.validatedAsks.length ? ask.asks.validatedAsks.length : 0}</p>
                        </div>
                        <div className="bodyTableRow table">
                            <details>
                                <summary>
                                    <p>Demandes terminées</p>
                                </summary>
                                {ask.asks.closedAsks.length>0 && (
                                    ask.asks.closedAsks.map((askClosed, index) => ( 
                                        <div key={index} className="family">
                                                <div className="firstfamilyInfos detailAsks">
                                                    <span>Famille: </span>
                                                    <div className="img smallImg">
                                                        <img src={askClosed.family.profile_photo?.startsWith("http") ? askClosed.family.profile_photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${askClosed.family.profile_photo}`} alt="" />
                                                    </div>
                                                    <p>{askClosed.family.user?.lastname} {askClosed.family.user?.firstname}</p>
                                                </div>
                                            <div className="btnAsk">
                                                <button type="button" className="profilbtn" onClick={()=>navigateProfil(askClosed.family)}>Profil</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </details>
                                <p className="nbForAsks">{ask.asks.closedAsks.length ? ask.asks.closedAsks.length : 0}</p> 
                        </div>
                        <div className="bodyTableRow table">
                            <details>
                                <summary>
                                    <p>Demandes rejetées</p>
                                </summary>
                                {ask.asks.rejectedAsks.length>0 && (
                                    ask.asks.rejectedAsks.map((askRejected, index) => ( 
                                        <div key={index} className="family">
                                                <div className="firstfamilyInfos detailAsks">
                                                    <span>Famille: </span>
                                                    <div className="img smallImg">
                                                        <img src={askRejected.family.profile_photo?.startsWith("http") ? askRejected.family.profile_photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${askRejected.family.profile_photo}`} alt="" />
                                                    </div>
                                                    <p>{askRejected.family.user?.lastname} {askRejected.family.user?.firstname}</p>
                                                </div>
                                            <div className="btnAsk">
                                                <button type="button" className="profilbtn" onClick={()=>navigateProfil(askRejected.family)}>Profil</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </details>
                                <p className="nbForAsks">{ask.asks.rejectedAsks.length ? ask.asks.rejectedAsks.length : 0}</p> 
                        </div>
                    </div>
                ))
            :
            <div className="neverAsk">Il n'existe pour le moment aucune demande d'accueil</div>
            }
            {successMessage && <Toast setToast={setSuccessMessage} message={successMessage} type={"success"} />}
            {errorMessage && <Toast setToast={setErrorMessage} message={errorMessage} type={"error"} />}
        </section>
    );
};

export default ListAsks;