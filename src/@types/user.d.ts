import { IFamily } from "./family";

export interface IUser {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    role?: string;
    id_family?: number;
    id_association?: number;
    created_at?: string;
    updated_at?: string;
    family?: IFamily;
    association?: {
        id: number;
        status: string;
        representative: string;
        rna_number: string;
        address: string;
        postal_code: string;
        city: string;
        phone: string;
        description: string;
        profile_photo: string;
        profile_file?: File | null;
        id_user: number;
        created_at: string;
        updated_at: string;
    }
}