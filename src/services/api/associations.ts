import axiosInstance from "../axios/axios";
import { IAssociationUser } from "../../@types/association";

const APIAssociation = {
    async getAssociations() {
        return await axiosInstance.get("/association")
    },

    async getAssociation(id: number) {
        return await axiosInstance.get(`/association/${id}`)
    },

    async patchAssociation(id: number, data: IAssociationUser) {
        return await axiosInstance.patch(`/association/${id}`, data)
    },

    async pathAssociationPhoto(id: number, data: FormData) {
        return await axiosInstance.patch(`/association/${id}`, data, {
            headers : {"Content-Type": "miltipart/form-data"}
        })
    },

    async deleteAssociations(id: number) {
       return await axiosInstance.delete(`/association/${id}`)
    },

    async getAnimalsOfAsso(id: number) {
        return await axiosInstance.get(`/association/${id}/animal`)
    },
};

export default APIAssociation;