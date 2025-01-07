export interface IAnimal {
    id?: number;
    name?: string;
    species?: string;
    breed?: string;
    gender?: string;
    age?: number;
    size?: string;
    description?: string;
    profile_photo?: string;
    profile_photo_file?: File | null;
    photo1?: string;
    photo1_file?: File | null;
    photo2?: string;
    photo2_file?: File | null;
    photo3?: string;
    photo3_file?: File | null;
    id_association?: number;
    id_family?: null | number;
    created_at?: string;
    updated_at?: string;
}