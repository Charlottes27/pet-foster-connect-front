import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare, faCheck, faPaw, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import "./FormAnimal.css";
import { IAnimal } from "../../../@types/animal.ts";
import validForm from "../../../utils/validForm.ts"
import APIAnimal from "../../../services/api/animal.ts";
import Toast from "../../Toast/Toast.tsx";

interface IFormAnimalProps {
    detailOfOneAnimal: IAnimal
    setModalModifiedAnimal: React.Dispatch<React.SetStateAction<boolean>>
    createdAnimal: boolean
    setCreatedAnimal: React.Dispatch<React.SetStateAction<boolean>>
    isInfoEditMode: boolean
    setIsInfoEditMode: React.Dispatch<React.SetStateAction<boolean>>
    setDetailOfOneAnimal: React.Dispatch<React.SetStateAction<IAnimal>>
}

function FormAnimal ({detailOfOneAnimal, setModalModifiedAnimal, createdAnimal, setCreatedAnimal, isInfoEditMode, setIsInfoEditMode, setDetailOfOneAnimal}: IFormAnimalProps) {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [originalData, setOriginalData] = useState<IAnimal>(detailOfOneAnimal);
    const [formData, setFormData] = useState<IAnimal>(detailOfOneAnimal);
    const id = detailOfOneAnimal.id || null;


    useEffect(()=>{
        async function updatedAnimalPhotos() {
            if(detailOfOneAnimal) {
                try {
                    let updatedAnimal = {...detailOfOneAnimal};
                    const photoKeys = ["profile_photo", "photo1", "photo2", "photo3"] as const;

                    for (const key of photoKeys) {
                        const photo = detailOfOneAnimal[key];

                        if(photo && photo !== "delete") {
                            const urlPhoto = (photo.startsWith("http") || photo.startsWith("blob")) ? photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${photo}`;
                            if (urlPhoto.startsWith("blob")) {
                                const photoFile = new File([urlPhoto], `server${key.charAt(0).toUpperCase() + key.slice(1)}-${id}.jpg`, {type: "image/jpeg"})
                                updatedAnimal = {
                                    ...updatedAnimal,
                                    [key]: urlPhoto,
                                    [`${key}_file`]: photoFile
                                }
                            } else {
                                const response = await fetch(urlPhoto);
                                if(!response.ok) throw new Error("erreur du fetch urlPhoto")
                                const blob = await response.blob();
                                const photoFile = new File([blob], `server${key.charAt(0).toUpperCase() + key.slice(1)}-${id}.jpg`, { type: "image/jpeg" })
                                
                                updatedAnimal = {
                                    ...updatedAnimal,
                                    [key]: urlPhoto,
                                    [`${key}_file`]: photoFile
                                }
                            }
                        } else {
                            updatedAnimal = {
                                ...updatedAnimal,
                                [key] : null,
                                [`${key}_file`] : null,
                            }
                        }
                    }
                    setFormData(updatedAnimal);
                    setOriginalData(updatedAnimal)
                } catch (error) {
                    console.error("Erreur lors de la mise à jour des photos:", error);
                }
            }
        }
        updatedAnimalPhotos();
    }, [detailOfOneAnimal])

    useEffect(()=>{
        return () => {
            const photoKeys: Array<keyof IAnimal> = ['profile_photo', 'photo1', 'photo2', 'photo3'];
            photoKeys.forEach(key => {
                const photo = formData[key] ;
                if (typeof photo === "string" && photo?.startsWith('blob:')) {
                    URL.revokeObjectURL(photo);
                }
            })
        }
    }, [])

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type} = event.target;

        if (type === "file" && event.target instanceof HTMLInputElement) {
            const files = event.target.files ? Array.from(event.target.files) : []; 
            const photoType = event.target.getAttribute("data-photo-type") as keyof Pick<IAnimal, "profile_photo" | "photo1" | "photo2" | "photo3">;

            if (files.length>0 && photoType) {
                if(formData[photoType]?.startsWith("blob:")) {
                    URL.revokeObjectURL(formData[photoType] as string)
                }

                const newImages = URL.createObjectURL(files[0]);

                setFormData((prevData: IAnimal) => ({
                    ...prevData,
                    [photoType]: newImages,
                    [`${photoType}_file`]: files[0]
                }));
            }
        } else {
            setFormData((prevData)=>{
                return {
                    ...prevData,
                    [name]: value,
                }
            });
            setErrorFields((prevFields) => prevFields.filter(field => field !== name));
        }
    };

    const handleSoubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const modifiedFields: Partial<IAnimal> = {};

        if (createdAnimal) {
            if (formData.name) {
                modifiedFields.name = formData.name;
            }
    
            if (formData.species) {
                modifiedFields.species = formData.species;
            }
    
            if (formData.breed) {
                modifiedFields.breed = formData.breed;
            }
    
            if (formData.gender) {
                modifiedFields.gender = formData.gender;
            }
    
            if (formData.age) {
                if (typeof formData.age === "number") {
                    modifiedFields.age = formData.age;
                } else {
                    modifiedFields.age = parseInt(formData.age, 10)
                }
            }
    
            if (formData.size) {
                modifiedFields.size = formData.size;
            }
    
            if (formData.description) {
                modifiedFields.description = formData.description;
            }
        } else {
            if (formData.name !== originalData.name) {
                modifiedFields.name = formData.name;
            }
    
            if (formData.species !== originalData.species) {
                modifiedFields.species = formData.species;
            }
    
            if (formData.breed !== originalData.breed) {
                modifiedFields.breed = formData.breed;
            }
    
            if (formData.gender !== originalData.gender) {
                modifiedFields.gender = formData.gender;
            }
    
            if (formData.age !== originalData.age) {
                if (typeof formData.age === "number") {
                    modifiedFields.age = formData.age;
                } else if (typeof formData.age === "string") {
                    modifiedFields.age = parseInt(formData.age, 10)
                }
            }
    
            if (formData.size !== originalData.size) {
                modifiedFields.size = formData.size;
            }
    
            if (formData.description !== originalData.description) {
                modifiedFields.description = formData.description;
            }
        }

console.log(modifiedFields);

        const fieldFormatsError = validForm.validateFieldFormatForAnimal(modifiedFields);
        if (fieldFormatsError && (fieldFormatsError.fileds.length! >0 || fieldFormatsError.message.length! >0)) {
            const message = fieldFormatsError.message;
            const fields = fieldFormatsError.fileds;

            const messageString = message.join(", ");
            setErrorMessage(messageString);
            setErrorFields(fields);
        }

        const sendText = async () => {
console.log("j'envoie le text de création");

            if (Object.entries(modifiedFields).length > 0) {
                try {
                    const response = await (createdAnimal ? APIAnimal.createAnimal(modifiedFields as IAnimal) : APIAnimal.patchAnimal( id!, modifiedFields));
                    if(response.status === 201) {
                        setSuccessMessage("Animal créé avec succès !");
                    } else {
                        setSuccessMessage("Modification(s) réalisée(s) avec succès !");
                    }
console.log(response);
                    return response.data;
                } catch (error) {
                    console.log(error)
                    console.error(
                        "Erreur lors de la modification des informations de l'association :",
                        (error as Error).message
                    );
                    throw new Error("Une erreur est survenue lors de la modification.");
                }
            }
        };

        const keysForPhotos: Array<keyof IAnimal> = ["profile_photo", "photo1", "photo2", "photo3"];
        const keysFileForPhoto: Array<keyof IAnimal> = ["profile_photo_file", "photo1_file", "photo2_file", "photo3_file"];

        const sendPhoto = async () => {
console.log("j'envoie les photos de création");
            const photoFormData = new FormData();
            let hasChanges = false;

            keysForPhotos.forEach((key, index) => {
                if (formData[key] !== originalData[key] || formData[key] !== null) {
                    hasChanges = true;
                    if (formData[key] === "delete") {
                        photoFormData.append(key, formData[key] as keyof IAnimal)
                    } else {
                        const fileKey = keysFileForPhoto[index];
                        const file = formData[fileKey];
                        if (typeof file === "string" ||  file instanceof Blob) {
                            photoFormData.append(key, file)
                        }
                    }

                }
            })
            
            if (hasChanges) {
                try {
                    const response = await APIAnimal.patchAnimalPhotos(id!, photoFormData);
                    console.log(response);
                    if(response.status === 201) {
                        setSuccessMessage("Animal créé avec succès !")
                    } else {
                        setSuccessMessage("Modification(s) réalisée(s) avec succès !")
                    }
console.log(response);
                    return response.data
                } catch (error) {
                    console.log(error)
                    throw new Error("Une erreur est survenue lors de l'envoi de la photo.");
                }
            }
        };

        try {
            const [textResponse, photoResponse] = await Promise.all([sendText(), sendPhoto()]);
            if (textResponse || photoResponse) {
                console.log(textResponse);
                
                setIsInfoEditMode(false);
                if(createdAnimal) setCreatedAnimal(false);

                for (const key  of keysForPhotos) {
                    const photo = formData[key];
                    if (typeof photo === "string" && photo!.startsWith("blob")) {
                        URL.revokeObjectURL(photo)
                    }
                }

                let updatedAnimal = {...formData};
                if(textResponse) {

                    updatedAnimal = {
                        ...updatedAnimal,
                        ...textResponse,
                    };
                }
                if (photoResponse) {
                    keysForPhotos.forEach((key) => {
                        if(photoResponse[key]) {
                            updatedAnimal[key] = photoResponse[key];
                        }
                    });
                }

                setFormData(updatedAnimal);
                setDetailOfOneAnimal(updatedAnimal);
            } else {
                setErrorMessage("Merci de renseigner au moins une modification, pour pourvoir valider la modification !");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
        }
       
    };

    const handleClickDeletePhoto = (nbPhoto: string) => {
        setFormData((prevData)=> ({
            ...prevData,
            [nbPhoto]: "delete",
            [`${nbPhoto}_file`]: undefined,
        }));
    };

    const handleCloseBtn = () => {
        setIsInfoEditMode(false);
        setModalModifiedAnimal(false);
        setErrorFields([]);
        setFormData({
            name: '',
            species: '',
            breed: '',
            gender: '',
            age: 0,
            size: '',
            description: '',
            profile_photo: '',
            photo1: '',
            photo2: '',
            photo3: '',
        });

        if (createdAnimal) {
            setCreatedAnimal(false)
        }
    }

    return (
        <div className="container">
            <div className="modalAddPatchAnimal">
                <button type="button" className="closeButton"
                    onClick={handleCloseBtn}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="modal-body">
                    <form action="" method="post" className="formAnimal" onSubmit={handleSoubmit}>
                        <div className="previewPhotos">
                            <div id="animalProfile_photo" >
                                {formData.profile_photo && formData.profile_photo !== "delete"
                                ? 
                                <img src={formData.profile_photo} alt="photo de profil de l'animal" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "none";
                                }}/>
                                :
                                <FontAwesomeIcon icon={faPaw} />
                                }
                            </div>
                            <div id="animalPhoto1" >
                                {formData.photo1 && formData.photo1 !== "delete"
                                ?
                                <img src={formData.photo1} alt="photo supplémentaire de l'animal" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "none";
                                }}/>
                                :
                                <FontAwesomeIcon icon={faPaw} />
                                }
                            </div>
                            <div id="animalPhoto2" >
                                {formData.photo2 && formData.photo2 !== "delete"
                                ?
                                <img src={formData.photo2} alt="photo supplémentaire de l'animal" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "none";
                                }}/>
                                :
                                <FontAwesomeIcon icon={faPaw} />
                                }
                            </div>
                            <div id="animalPhoto3" >
                                {formData.photo3 && formData.photo3 !== "delete"
                                ?
                                <img src={formData.photo3} alt="photo supplémentaire de l'animal" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "none";
                                }}/>
                                :
                                <FontAwesomeIcon icon={faPaw} />
                                }
                            </div>
                            {isInfoEditMode && (
                                <div className="editProfilImgWrap">
                                    <div className="dashboardPhoto">
                                        <p>Sa photo de profil :</p>
                                        <label htmlFor="profile_photo">Ajouter</label>
                                        <input type="file" data-photo-type="profile_photo" name="profile_photo" id="profile_photo" accept="image/*" disabled={!isInfoEditMode} onChange={handleChangeInput}/>
                                        <button className="deleteProfilImg" type="button" onClick={()=>handleClickDeletePhoto("profile_photo")}>Supprimer</button>
                                    </div>
                                    
                                    <div className="dashboardPhoto">
                                        <p>Photo supp 1 :</p>
                                        <label htmlFor="photo1">Ajouter</label>
                                        <input type="file" data-photo-type="photo1" name="photo1" id="photo1" accept="image/*" disabled={!isInfoEditMode} onChange={handleChangeInput}/>
                                        <button className="deleteProfilImg" type="button" onClick={()=>handleClickDeletePhoto("photo1")}>Supprimer</button>
                                    </div>

                                    <div className="dashboardPhoto">
                                        <p>Photo supp 2 :</p>
                                        <label htmlFor="photo2">Ajouter</label>
                                        <input type="file" data-photo-type="photo2" name="photo2" id="photo2" accept="image/*" disabled={!isInfoEditMode} onChange={handleChangeInput}/>
                                        <button className="deleteProfilImg" type="button" onClick={()=>handleClickDeletePhoto("photo2")}>Supprimer</button>
                                    </div>

                                    <div className="dashboardPhoto">
                                        <p>Photo supp 3 :</p>
                                        <label htmlFor="photo3">Ajouter</label>
                                        <input type="file" data-photo-type="photo3" name="photo3" id="photo3" accept="image/*" disabled={!isInfoEditMode} onChange={handleChangeInput}/>
                                        <button className="deleteProfilImg" type="button" onClick={()=>handleClickDeletePhoto("photo3")}>Supprimer</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="containerInput">
                            <h3>Mon animal</h3>
                            <label htmlFor="name" className={errorFields.includes("name") ? "infoLabel errorFields" : "infoLabel"}>Nom</label>
                            <input type="text" name="name" id="name" className={errorFields.includes("name") ? "infoInput errorFields" : "infoInput"} value={formData.name} disabled={!isInfoEditMode} onChange={handleChangeInput} autoComplete="on" />

                            <label htmlFor="species" className={errorFields.includes("species") ? "infoLabel errorFields" : "infoLabel"}>Espèce</label>
                            <input type="text" name="species" id="species" className={errorFields.includes("species") ? "infoInput errorFields" : "infoInput"} value={formData.species} disabled={!isInfoEditMode} onChange={handleChangeInput} autoComplete="on" />

                            <label htmlFor="breed" className={errorFields.includes("breed") ? "infoLabel errorFields" : "infoLabel"}>Race</label>
                            <input type="text" name="breed" id="breed" className={errorFields.includes("breed") ? "infoInput errorFields" : "infoInput"} value={formData.breed} disabled={!isInfoEditMode} onChange={handleChangeInput} autoComplete="on" />

                            <label htmlFor="gender" className={errorFields.includes("gender") ? "infoLabel errorFields" : "infoLabel"}>Genre</label>
                            <input type="text" name="gender" id="gender" className={errorFields.includes("gender") ? "infoInput errorFields" : "infoInput"} value={formData.gender} disabled={!isInfoEditMode} onChange={handleChangeInput} autoComplete="on" />

                            <label htmlFor="age" className={errorFields.includes("age") ? "infoLabel errorFields" : "infoLabel"}>Age</label>
                            <input type="number" name="age" id="age" className={errorFields.includes("age") ? "infoInput errorFields" : "infoInput"} value={formData.age} disabled={!isInfoEditMode} onChange={handleChangeInput} autoComplete="on" />

                            <label htmlFor="size" className={errorFields.includes("size") ? "infoLabel errorFields" : "infoLabel"}>Taille</label>
                            <input type="text" name="size" id="size" className={errorFields.includes("size") ? "infoInput errorFields" : "infoInput"} value={formData.size} disabled={!isInfoEditMode} onChange={handleChangeInput} autoComplete="on" />

                            <label htmlFor="description" className={errorFields.includes("description") ? "infoLabel errorFields" : "infoLabel"}>Description</label>
                            <textarea name="description" id="description" className={errorFields.includes("description") ? "infoInput errorFields" : "infoInput"} value={formData.description} disabled={!isInfoEditMode} onChange={handleChangeInput} />
                        </div>

                        {isInfoEditMode &&
                            <div className="buttonsWrapAnimal">
                                {createdAnimal ?
                                <button type="submit" className="btnCreatedAnimal" onClick={() => {}}>
                                    <FontAwesomeIcon icon={faPlus} /> Créer mon animal
                                </button>
                                :
                                <>
                                    <button type="submit" className="btnModifAnimal">
                                    <FontAwesomeIcon icon={faCheck} /> Valider la modification
                                    </button>
                                    <button type="reset" className="btnModifAnimal" onClick={()=>{setIsInfoEditMode(false); setFormData(originalData) ; setErrorFields([])}}>
                                        <FontAwesomeIcon icon={faXmark} /> Annuler la modification
                                    </button>
                                </>
                                }
                            </div>
                        }
                    </form>

                    {!isInfoEditMode && 
                        <div className="buttonsWrapAnimal">
                            <button type="button" className="btnModifAnimal" onClick={() => {setIsInfoEditMode(true)}}>
                                    <FontAwesomeIcon icon={faPenToSquare} /> Modifier les informations
                                </button>
                        </div>
                    }    
                    {errorMessage && <Toast setToast={setErrorMessage} message={errorMessage} type="error"/>}
                    {successMessage && <Toast setToast={setSuccessMessage} message={successMessage} type="success"/>}
                </div>
            </div>
        </div>
    );
};

export default FormAnimal;