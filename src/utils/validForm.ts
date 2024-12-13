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

interface IFormDataUpdate {
    representative?: string,
    rna_number?: string,
    address?: string,
    postal_code?: string,
    city?: string,
    phone?: string,
    user?: {
        firstname?: string,
        lastname?: string,
        email?: string,
    },
}

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
        const fileds: string[] = [];
        const message: string[] = [];
        if (!valideInput(formData.lastname, "nameRegex")) {
            message.push("Merci de retirer le(s) chiffre(s) de votre Nom");
            fileds.push("lastname");
        }
        if (!valideInput(formData.firstname, "nameRegex")) {
            message.push("Merci de retirer le(s) chiffre(s) Prénom");
            fileds.push("firstname");
        }
        if (!valideInput(formData.email, "validEmail")) {
            message.push("Merci de renseigner un mail valide");
            fileds.push("email");
        }
        const address = formData.family?.address ?? formData.association?.address;
        if (!valideInput(address!, "presenceLetters")) {
            message.push("Merci de finir de compléter votre adresse");
            fileds.push("family.address", "association.address");
        }
        const postal_code = formData.family?.postal_code ?? formData.association?.postal_code;
        if (!valideInput(postal_code!, "postalCode")) {
            message.push("Merci de renseigner un code postal valide");
            fileds.push("family.postal_code", "association.postal_code");
        }
        const phone = formData.family?.phone ?? formData.association?.phone;
        if (!valideInput(phone!, "frenchPhone")) {
            message.push("Merci de renseigner un numéro de téléphone valide");
            fileds.push("family.phone", "association.phone");
        }
        if (formData.association) {
            if (!valideInput(formData.association.rna_number, "rnaNumber")) {
            message.push("Merci de renseigner un numéro RNA valide");
            fileds.push("association.rna_number");
            }
        }
        if (fileds && message) {
            const messageString = message.join(", ");
            return {fileds, messageString};
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

    validateFieldFormatForUpdate (formData: IFormDataUpdate) {
        const fileds: string[] = [];
        const message: string[] = [];

        if (formData.user?.lastname !== undefined && !valideInput(formData.user?.lastname, "nameRegex")) {
             message.push("Merci de retirer le(s) chiffre(s) de votre Nom");
            fileds.push("user.lastname");
        }
        if (formData.user?.firstname !== undefined && !valideInput(formData.user?.firstname, "nameRegex")) {
            message.push("Merci de retirer le(s) chiffre(s) Prénom");
            fileds.push("user.firstname");
        }
        if (formData.user?.email !== undefined && !valideInput(formData.user?.email, "validEmail")) {
            message.push("Merci de renseigner un mail valide");
            fileds.push("user.email");
        }
        const address = formData.address;
        if (address !== undefined && !valideInput(address!, "presenceLetters")) {
            message.push("Merci de finir de compléter votre adresse");
            fileds.push("address");
        }
        const postal_code = formData.postal_code;
        if (postal_code !== undefined && !valideInput(postal_code!, "postalCode")) {
            message.push("Merci de renseigner un code postal valide");
            fileds.push("postal_code");
        }
        const phone = formData.phone;
        if (phone !== undefined && !valideInput(phone!, "frenchPhone")) {
            message.push("Merci de renseigner un numéro de téléphone valide");
            fileds.push("phone");
        }
        const rna_number = formData.rna_number;
        if (rna_number !== undefined && !valideInput(rna_number, "rnaNumber")) {
            message.push("Merci de renseigner un numéro RNA valide");
            fileds.push("rna_number");
        }
        if (fileds && message) {
            return {fileds, message};
        }
        return null;
    },
};

export default validForm;