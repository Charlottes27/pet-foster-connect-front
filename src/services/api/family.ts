import axiosInstance from "../axios/axios";
import { IFamilyUser } from "../../@types/family";

const APIFamily = {
    async getFamily(id: number) {
        return await axiosInstance.get(`/family/${id}`)
    },

    async pathFamily(id: number, data: IFamilyUser) {
        return await axiosInstance.patch(`/family/${id}`, data)
    },

    async getAnimalsOfFamily(id:number) {
        return await axiosInstance.get(`/family/${id}/animal`)
    }
};

export default APIFamily;