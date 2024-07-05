import ProvinceRepository from "../repositories/province-repository.js";
import pg from "pg";
const provinceRepository = new ProvinceRepository();

class ProvinceService {

    async CrearProvincia(provincia) {
        try {
            return await provinceRepository.CrearProvincia(provincia);
        } catch (error) {
            console.error('Error in crearProvincia:', error);
            throw error;
        }
    }

    async BorrarProvincia(id) {
        try {
            return await provinceRepository.BorrarProvincia(id);
        } catch (error) {
            console.error('Error in borrarProvincia:', error);
            throw error;
        }
    }

    async EditarProvincia(provincia) {
        try {
            return await provinceRepository.EditarProvincia(provincia);
        } catch (error) {
            console.error('Error in editarProvincia:', error);
            throw error;
        }
    }

    async GetAllProvincias(limit, offset) {
        try {
            const provinces = await provinceRepository.GetAllProvincias(limit, offset);
            return provinces;
        } catch (error) {
            console.error('Error in getAllProvincias:', error);
            throw error;
        }
    }

    async GetProvinciaById(id) {
        try {
            const province = await provinceRepository.GetProvinciaById(id);
            return province;
        } catch (error) {
            console.error('Error in getProvinciaById:', error);
            throw error;
        }
    }
    async GetEventLocationByProvinceId(id) {
        try {
            const province = await provinceRepository.GetEventLocationByProvinceId(id);
            return province;
        } catch (error) {
            console.error('Error in GetEventLocationByProvinceId:', error);
            throw error;
        }
    }
}

export default ProvinceService;