import axiosInstance from "../axios/axios";
import { IAnimal } from "../../@types/animal";

const APIAnimal = {
    async getAnimals() {
        return await axiosInstance.get("/animal")
    },

    async getAnimal(id: number) {
        return await axiosInstance.get(`/animal/${id}`)
    },

    async createAnimal(data: IAnimal | FormData) {
        return await axiosInstance.post("/animal", data)
    },

    async patchAnimal(id:number, data: IAnimal) {
        return await axiosInstance.patch(`/animal/${id}`, data)
    },

    async patchAnimalPhotos(id:number, data: FormData) {
        return await axiosInstance.patch(`/animal/${id}`, data, {
            headers : {"Content-Type": "multipart/form-data"}
        })
    },

    async deleteAnimal(id: number) {
        return await axiosInstance.delete(`/animal/${id}`)
    }
}

export default APIAnimal;