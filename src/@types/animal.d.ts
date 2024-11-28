export interface IAnimal {
    id: number;
    name: string;
    species: string;
    breed: string | null;
    gender: string;
    age: number;
    size: string;
    description: string;
    profile_photo: string;
    // null or string for extra photo
    photo1: null | string;
    photo2: null | string;
    photo3: null | string;
    id_association: number;
    // by default : null, possibly later : number
    id_family: null | number;
    created_at: string;
    updated_at: string;
}