import axiosInstance from "../axios/axios";
import { IFamilyUser } from "../../@types/family";

const APIFamily = {
    async getFamily(id: number) {
        return await axiosInstance.get(`/family/${id}`)
    },

    async pathFamily(id: number, data: IFamilyUser) {
        return await axiosInstance.patch(`/family/${id}`, data)
    },

    async pathFamilyPhoto(id: number, data: FormData) {
        return await axiosInstance.patch(`/family/${id}`, data, {
            headers : {"Content-Type": "multipart/form-data"}
        })
    },

    async getAnimalsOfFamily(id:number) {
        return await axiosInstance.get(`/family/${id}/animal`)
    },

    async deleteFamily (id: number) {
        return await axiosInstance.delete(`/family/${id}`)
    }
};

export default APIFamily;