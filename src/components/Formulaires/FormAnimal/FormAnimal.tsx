import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";import { useState } from "react";

import "./FormAnimal.css";
import { IAnimal } from "../../../@types/animal.ts";
import validForm from "../../../utils/validForm.ts"

interface IFormAnimalProps {
    setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
    detailOfOneAnimal: IAnimal
    setModalModifiedAnimal: React.Dispatch<React.SetStateAction<boolean>>
}

function FormAnimal ({setSuccessMessage, setErrorMessage, detailOfOneAnimal, setModalModifiedAnimal}: IFormAnimalProps) {
    const [isInfoEditMode, setIsInfoEditMode] = useState(false);
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [originalData, setOriginalData] = useState<IAnimal>(detailOfOneAnimal);
    const [formData, setFormData] = useState<IAnimal>(detailOfOneAnimal);
console.log(originalData);
console.log(formData);


const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value, type} = event.target;

    if (type === "file") {

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

const handleSoubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const modifiedFields: Partial<IAnimal> = {};

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
        modifiedFields.age = formData.age;
    }

    if (formData.size !== originalData.size) {
        modifiedFields.size = formData.size;
    }

    if (formData.description !== originalData.description) {
        modifiedFields.description = formData.description;
    }

    const fieldFormatsError = validForm.validateFieldFormatForUpdate(modifiedFields);
    if (fieldFormatsError && (fieldFormatsError.fileds.length! >0 || fieldFormatsError.message.length! >0)) {
        const message = fieldFormatsError.message;
        const fields = fieldFormatsError.fileds;

        const messageString = message.join(", ");
        setErrorMessage(messageString);
        setErrorFields(fields);
    }
};
    // const [photos, setPhotos] = useState<{file:File, preview:string}[]>([]);

    // const handlesPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files) {
    //         const files: File[] = Array.from(event.target.files);
    //         const newPhotos: {file:File, preview:string}[] = files.slice(0, 4).map(file => ({
    //             file,
    //             preview: URL.createObjectURL(file)
    //         }));
    //         setPhotos(newPhotos);
    //     }
    // }


    return (
        <div className="container">
            <div className="modalAddPatchAnimal">
                <div className="modal-body">
                    <button type="button" className="closeButton"
                        onClick={()=>{setModalModifiedAnimal(false); setErrorFields([]); setFormData({
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
                        })}}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <form action="" method="post" className="formAnimal">
                        {/* <div id="photo-container">
                            <label htmlFor="" className="infoLabel">Photos (maximun 4)</label>
                            <input type="file" id="photo-input" accept="image/*" multiple onChange={handlesPhotoChange}/>
                            <div id="photo-preview">
                                {photos.map((photo, index) => (
                                    <img key={index} src={photo.preview} alt="" style={{ maxWidth: '200px', maxHeight: '200px', margin: '10px' }}/>
                                ))}
                            </div>
                        </div> */}
                        <div className="previewPhotos">
                            <div id="animalProfile_photo" >
                                <img src={formData.profile_photo?.startsWith("http") ? formData.profile_photo : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${formData.profile_photo}`} alt="" />
                            </div>
                            <div id="animalPhoto1" >
                                <img src={formData.photo1?.startsWith("http") ? formData.photo1 : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${formData.photo1}`} alt="" />
                            </div>
                            <div id="animalPhoto2" >
                                <img src={formData.photo2?.startsWith("http") ? formData.photo2 : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${formData.photo2}`} alt="" />
                            </div>
                            <div id="animalPhoto3" >
                                <img src={formData.photo3?.startsWith("http") ? formData.photo3 : `${import.meta.env.VITE_BASE_URL_PUBLIC}/${formData.photo3}`} alt="" />
                            </div>
                        </div>

                        <div className="containerInput">
                            <h3>Mon animal</h3>
                            <label htmlFor="name" className={errorFields.includes("name") ? "infoLabel errorFields" : "infoLabel"}>Nom</label>
                            <input type="text" name="name" id="name" className={errorFields.includes("name") ? "infoInput errorFields" : "infoInput"} value={formData.name} disabled={!isInfoEditMode} onChange={handleChangeInput} />

                            <label htmlFor="species" className={errorFields.includes("species") ? "infoLabel errorFields" : "infoLabel"}>Espèce</label>
                            <input type="text" name="species" id="species" className={errorFields.includes("species") ? "infoInput errorFields" : "infoInput"} value={formData.species} disabled={!isInfoEditMode} onChange={handleChangeInput} />

                            <label htmlFor="breed" className={errorFields.includes("breed") ? "infoLabel errorFields" : "infoLabel"}>Race</label>
                            <input type="text" name="breed" id="breed" className={errorFields.includes("breed") ? "infoInput errorFields" : "infoInput"} value={formData.breed} disabled={!isInfoEditMode} onChange={handleChangeInput} />

                            <label htmlFor="gender" className={errorFields.includes("gender") ? "infoLabel errorFields" : "infoLabel"}>Genre</label>
                            <input type="text" name="gender" id="gender" className={errorFields.includes("gender") ? "infoInput errorFields" : "infoInput"} value={formData.gender} disabled={!isInfoEditMode} onChange={handleChangeInput} />

                            <label htmlFor="age" className={errorFields.includes("age") ? "infoLabel errorFields" : "infoLabel"}>Age</label>
                            <input type="number" name="age" id="age" className={errorFields.includes("age") ? "infoInput errorFields" : "infoInput"} value={formData.age} disabled={!isInfoEditMode} onChange={handleChangeInput} />

                            <label htmlFor="size" className={errorFields.includes("size") ? "infoLabel errorFields" : "infoLabel"}>Taille</label>
                            <input type="text" name="size" id="size" className={errorFields.includes("size") ? "infoInput errorFields" : "infoInput"} value={formData.size} disabled={!isInfoEditMode} onChange={handleChangeInput} />

                            <label htmlFor="description" className={errorFields.includes("description") ? "infoLabel errorFields" : "infoLabel"}>Description</label>
                            <textarea name="description" id="description" className={errorFields.includes("description") ? "infoInput errorFields" : "infoInput"} value={formData.description} disabled={!isInfoEditMode} onChange={handleChangeInput} />
                        
                            {isInfoEditMode && (
                                <div className="editProfilImgWrap">
                                    <label htmlFor="profile_photo">Choisir une photo</label>
                                    <input type="file" name="profile_photo" id="profile_photo" accept="image/*" disabled={!isInfoEditMode} onChange={handleChangeInput}/>
                                    <button className="deleteProfilImg" type="button" onClick={()=>{}}>Supprimer ma photo</button>
                                </div>
                            )}
                        </div>




                        {/* <label htmlFor="" className="infoLabel"></label>
                        <input type="file" name="profile_phot" id="" className="infoInput"/>

                        <label htmlFor="" className="infoLabel"></label>
                        <input type="text" name="" id="" className="infoInput"/>

                        <label htmlFor="" className="infoLabel"></label>
                        <input type="text" name="" id="" className="infoInput"/>

                        <label htmlFor="" className="infoLabel"></label>
                        <input type="text" name="" id="" className="infoInput"/> */}
                    </form>
                    {!isInfoEditMode &&
                        <div className="buttonsWrapAnimal">
                            <button type="button" className="btnModifAnimal" onClick={() => {setIsInfoEditMode(true)}}>
                                <FontAwesomeIcon icon={faPenToSquare} /> Modifier les informations
                            </button>
                        </div>
                    }
                    {isInfoEditMode &&
                        <div className="buttonsWrapAnimal">
                        <button type="submit" className="btnModifAnimal " >
                            <FontAwesomeIcon icon={faCheck} /> Valider la modification
                        </button>
                        <button type="reset" className="btnModifAnimal " onClick={()=>{setIsInfoEditMode(false); setFormData(originalData) ; setErrorFields([])}}>
                            <FontAwesomeIcon icon={faXmark} /> Annuler la modification
                        </button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default FormAnimal;