import ProvinceRepository from "../repositories/province-repository.js";
import pg from "pg";

const client = new pg.Client();
client.connect();

class ProvinceService {
    constructor() {
        this.ProvinceRepository = new ProvinceRepository();
    }

    async crearProvincia(name, full_name, latitude, longitude, display_order) {
        try {
            await this.provinceRepository.CrearProvincia(name, full_name, latitude, longitude, display_order);
            return { message: 'Provincia creada correctamente' };
        } catch (error) {
            console.error('Error in crearProvincia:', error);
            throw error;
        }
    }

    async borrarProvincia(id) {
        try {
            await this.ProvinceRepository.BorrarProvincia(id);
            return { message: 'Provincia borrada correctamente' };
        } catch (error) {
            console.error('Error in borrarProvincia:', error);
            throw error;
        }
    }

    async editarProvincia(id, name, full_name, latitude, longitude, display_order) {
        try {
            await this.ProvinceRepository.EditarProvincia(id, name, full_name, latitude, longitude, display_order);
            return { message: 'Provincia actualizada correctamente?' };
        } catch (error) {
            console.error('Error in editarProvincia:', error);
            throw error;
        }
    }

    async getAllProvincias(limit, offset) {
        try {
            const provinces = await this.ProvinceRepository.GetAllProvincias(limit, offset);
            return provinces;
        } catch (error) {
            console.error('Error in getAllProvincias:', error);
            throw error;
        }
    }

    async getProvinciaById(id) {
        try {
            const province = await this.ProvinceRepository.GetProvinciasById(id);
            return province;
        } catch (error) {
            console.error('Error in getProvinciaById:', error);
            throw error;
        }
    }
}

export default ProvinceService;