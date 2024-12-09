import _ from 'lodash';
import valideInput from "./isValidInput";

interface IFormData {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
    family?: {
        address: string,
        postal_code: string,
        city: string,
        phone: string,
    },
    association?: {
        representative: string,
        rna_number: string,
        address: string,
        postal_code: string,
        city: string,
        phone: string,
      },
};

const validForm = {
    validateRequiredFields (formData: IFormData, formType: "family" | "association" ) {
        const commonFields = [
            { key: 'lastname', label: 'Nom' },
            { key: 'firstname', label: 'Prénom' },
            { key: 'email', label: 'Mail' },
            { key: 'password', label: 'Mot de Passe' },
            { key: 'confirmPassword', label: 'Confirmation du mot de passe' },
        ];

        const specificFields =  formType === "family" ? [
            { key: 'family.address', label: 'Adresse' },
            { key: 'family.postal_code', label: 'Code Postal' },
            { key: 'family.city', label: 'Ville' },
            { key: 'family.phone', label: 'Téléphone' },
        ] : [
            { key: 'association.representative', label: 'Association' },
            { key: 'association.rna_number', label: 'Numéro RNA' },
            { key: 'association.address', label: 'Adresse' },
            { key: 'association.postal_code', label: 'Code Postal' },
            { key: 'association.city', label: 'Ville' },
            { key: 'association.phone', label: 'Téléphone' },
        ]

        const requiredFields =[...commonFields, ...specificFields]
        const missingFields = requiredFields.filter(field => !_.get(formData, field.key).trim());
    
        if (missingFields.length > 0) {
            const labels = missingFields.map(field => field.label);
            const keys = missingFields.map(field => field.key);
            return {
                message: `Le(s) champ(s) ${labels.join(', ')} sont obligatoires pour l'inscription`,
                fields: keys,
            }
        }
        return null;
    },

    validateFieldFormats (formData: IFormData) {
        if (!valideInput(formData.lastname, "notNumber")) {
            return {
                message:  "Merci de retirer le(s) chiffre(s) de votre Nom",
                fileds: ["lastname"],
            };
        }
        if (!valideInput(formData.firstname, "notNumber")) {
            return {
                message:  "Merci de retirer le(s) chiffre(s) Prénom",
                fileds: ["firstname"],
            };
        }
        if (!valideInput(formData.email, "validEmail")) {
            return {
                message:  "Merci de renseigner un mail valide",
                fileds: ["email"],
            };
        }
        const address = formData.family?.address ?? formData.association?.address;
        if (!valideInput(address!, "presenceLetters")) {
            return {
                message:  "Merci de finir de compléter votre adresse",
                fileds: ["family.adress", "association.address"],
            };
        }
        const postal_code = formData.family?.postal_code ?? formData.association?.postal_code;
        if (!valideInput(postal_code!, "postalCode")) {
            return {
                message:  "Merci de renseigner un code postal valide",
                fileds: ["family.postal_code", "association.postal_code"],
            };
        }
        const phone = formData.family?.phone ?? formData.association?.phone;
        if (!valideInput(phone!, "frenchPhone")) {
            return {
                message:  "Merci de renseigner un numéro de téléphone valide",
                fileds: ["family.phone", "association.phone"],
            };
        }
        if (formData.association) {
            if (!valideInput(formData.association.rna_number, "rnaNumber")) {
                return {
                    message:  "Merci de renseigner un numéro RNA valide",
                    fileds: ["association.rna_number"],
                };
            }
        }
        return null;
    },

    validatePasswordMatch (formData: IFormData) {
        if (formData.password !== formData.confirmPassword) {
            return "La confirmation du mot de passe doit être identique au mot de passe";
        }
        return null;
    },

    prepareDataForSubmission (formData: IFormData) {
        const { confirmPassword, ...dataToSubmit } = formData;
        dataToSubmit.email = dataToSubmit.email.toLowerCase().trim();
        return dataToSubmit;
    },
};

export default validForm;