import { IUser } from "../../../@types/user";

interface IInputsProfilesFaProps {
    formDataUser: IUser
    handleChangeInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    isInfoEditMode: boolean
}

function InputsProfilesFa ({formDataUser, handleChangeInput, isInfoEditMode}: IInputsProfilesFaProps) {
    return (
        <div className="fieldsWrap">
                    <label htmlFor="lastname" className="infoLabel" id="labelLastname">Nom</label>
                    <input type="text" name="lastname" id="lastname" className="infoInput" value={formDataUser?.lastname} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="firstname" className="infoLabel" id="labelFirstname">Prénom</label>
                    <input type="text" name="firstname" id="firstname" className="infoInput" value={formDataUser?.firstname} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="addess" className="infoLabel" id="labelAddess">Adresse</label>
                    <input type="text" name="address" id="addess" className="infoInput" value={formDataUser?.family?.address} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="postal_code" className="infoLabel" id="labelPostal_code">Code Postal</label>
                    <input type="text" name="postal_code" id="postal_code" className="infoInput" value={formDataUser?.family?.postal_code} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="city" className="infoLabel" id="labelCity">Ville</label>
                    <input type="text" name="city" id="city" className="infoInput" value={formDataUser?.family?.city} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="phone" className="infoLabel" id="labelPhone">Téléphone</label>
                    <input type="text" name="phone" id="phone" className="infoInput" value={formDataUser?.family?.phone} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <label htmlFor="email" className="infoLabel" id="labelEmail">Mail</label>
                    <input type="text" name="email" id="email" className="infoInput" value={formDataUser?.email} onChange={handleChangeInput} disabled={!isInfoEditMode} />

                    <h2>Situation de mon foyer</h2>

                    <div className="garden" id="garden">
                        <p>Avez-vous un jardin ?</p>
                        <div>
                            <input type="radio" name="garden" id="gardenTrue" className="infoInput" value={"true"} onChange={handleChangeInput} checked={formDataUser.family?.garden === true} disabled={!isInfoEditMode} />
                            <label htmlFor="gardenTrue" className="infoLabel">Oui</label>
                        </div>
                        <div>
                            <input type="radio" name="garden" id="gardenFalse" className="infoInput" value={"false"} onChange={handleChangeInput} checked={formDataUser.family?.garden === false} disabled={!isInfoEditMode} />
                            <label htmlFor="gardenFalse" className="infoLabel">Non</label>
                        </div>
                    </div>

                    <div className="children" id="children">
                        <label htmlFor="number_of_children" className="infoLabel">Combien d'enfants avez-vous ?</label>
                        <input type="number" name="number_of_children" id="number_of_children" className="infoInput" min={0} value={formDataUser?.family?.number_of_children} onChange={handleChangeInput} disabled={!isInfoEditMode} />    
                    </div>

                    <div className="animals" id="animals">
                        <label htmlFor="number_of_animals" className="infoLabel">Combien d'animaux avez-vous ?</label>
                        <input type="number" name="number_of_animals" id="number_of_animals" className="infoInput" min={0} value={formDataUser?.family?.number_of_animals} onChange={handleChangeInput} disabled={!isInfoEditMode} />
                    </div>

                    <label htmlFor="description" className="infoLabel" id="labelDescription">Description</label>
                    <textarea name="description" id="description" className="infoInput" value={formDataUser?.family?.description ?? ""} onChange={handleChangeInput} disabled={!isInfoEditMode} />
                </div>
    );
};

export default InputsProfilesFa;