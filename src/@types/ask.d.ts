import { IAnimal } from "./animal";
import { IFamilyUser } from "./family";

export interface IAsk {
    id: number;
    id_animal: number;
    id_family: number;
    status: string;
    animal: IAnimal;
    family: IFamilyUser;
    created_at: string;
    updated_at: string;
};

export interface IAskByAnimal {
    animal: IAnimal;
    asks: {
        pendingAsks : IAsk[],
        validatedAsks : IAsk[],
        closedAsks : IAsk[],
        rejectedAsks : IAsk[],
    };
}