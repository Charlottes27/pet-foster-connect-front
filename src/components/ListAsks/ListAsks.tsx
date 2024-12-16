import { useEffect, useState } from "react";

import "./ListAsks.css";
import { IUser } from "../../@types/user";
import { IAsk, IAskByAnimal } from "../../@types/ask";
import APIAsk from "../../services/api/ask";

interface IListAsksProps {
    user: IUser | null
}

type AskStatus = "en attente" | "validée" | "terminée" | "rejetée";

function ListAsks ({user}: IListAsksProps) {
    const [animalsAsks, setAnimalsAsks] = useState< IAskByAnimal[] >([]);

    

    const associationId = user?.id_association || user?.association?.id;
    
    useEffect(()=>{
        const fetchAnimals = async () => {
            try {
                const response = await APIAsk.getAks(associationId!) as { data: IAsk[] };;
                const asksByAnimal = response.data.reduce<Record<string, IAskByAnimal>>((acc: Record<string, IAskByAnimal>, ask: IAsk) => {
                    const animalId = ask.animal.id;

                    if(!acc[animalId]) {
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
console.log(statusKey);
                    
                    if (statusKey) {
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
    }, []);

    console.log(animalsAsks);
    

    return (
        <section>
            {animalsAsks.map((ask, index) => (
                <div className="asksByAnimal" key={index} >
                            <div className="headerTable">
                                <div className="img">
                                    <img src={ask.animal.profile_photo.startsWith("http") ? ask.animal.profile_photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${ask.animal.profile_photo}`} alt="photo de l'animal" />
                                </div>
                                <p>{ask.animal.name}</p>
                            </div>
                        <div className="bodyTableFirstRow">
                            <details>
                                <summary>
                                    <p>Demandes en attentes</p>
                                    <p className="nbForAsks">{ask.asks.pendingAsks.length ? ask.asks.pendingAsks.length : 0}</p>
                                </summary>
                            </details>
                        </div>
                        <div className="bodyTableSecondRow">
                            <details>
                                <summary>
                                    <p>Demandes en cours</p>
                                    <p className="nbForAsks">{ask.asks.validatedAsks.length ? ask.asks.validatedAsks.length : 0}</p>
                                </summary>
                            </details>
                        </div>
                        <div className="bodyTableThirdRow">
                            <details>
                                <summary>
                                    <p>Demandes terminées</p>
                                    <p className="nbForAsks">{ask.asks.closedAsks.length ? ask.asks.closedAsks.length : 0}</p> 
                                </summary>
                            </details>
                        </div>
                        <div className="bodyTableFourthRow">
                            <details>
                                <summary>
                                    <p>Demandes rejetées</p>
                                    <p className="nbForAsks">{ask.asks.rejectedAsks.length ? ask.asks.rejectedAsks.length : 0}</p> 
                                </summary>
                            </details>
                        </div>

                </div>
            ))}
        </section>
    );
};

export default ListAsks;