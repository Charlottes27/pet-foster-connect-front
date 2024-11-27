import axiosInstance from "../axios/axios"

const APIAnimal = {
    async getAnimals() {
        return await axiosInstance.get("/animal")
    },

    async getAnimal(id: number) {
        return await axiosInstance.get(`/animal/${id}`)
    },

    async createAnimal(data: {
        name: string,
        species: string,
        breed: string,
        gender:string,
        age: number,
        size:string,
    }) {
        return await axiosInstance.post("/animal", data)
    },

    async patchAnimal(id:number, data: {
        name?: string,
        species?: string,
        breed?: string,
        gender?:string,
        age?: number,
        size?:string,
    }) {
        return await axiosInstance.patch(`/animal/${id}`, data)
    },

    async deleteAnimal(id: number) {
        return await axiosInstance.delete(`/animal/${id}`)
    }
}

export default APIAnimal;