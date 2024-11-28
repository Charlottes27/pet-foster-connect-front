import { IAnimal } from "./animal";
import { IUser } from "./user";

export interface IAssociation {
    id: number;
    representative: string;
    rna_number: string;
    address: string;
    postal_code: string;
    city: string;
    phone: string | null;
    description: string;
    status: string;
    profile_photo: string | undefined;
    profile_file: File | undefined;
    created_at: string;
    updated_at: string;
    id_user: number;
    user: IUser;
    animals: IAnimal[];
}