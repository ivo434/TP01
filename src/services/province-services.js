import ProvinceRepository from "../repositories/province-repository.js";
import pg from "pg";
const provinceRepository = new ProvinceRepository();

class ProvinceService {

    async CrearProvincia(name, full_name, latitude, longitude, display_order) {
        try {
            await provinceRepository.CrearProvincia(name, full_name, latitude, longitude, display_order);
            return { message: 'Provincia creada correctamente' };
        } catch (error) {
            console.error('Error in crearProvincia:', error);
            throw error;
        }
    }

    async BorrarProvincia(id) {
        try {
            await provinceRepository.BorrarProvincia(id);
            return { message: 'Provincia borrada correctamente' };
        } catch (error) {
            console.error('Error in borrarProvincia:', error);
            throw error;
        }
    }

    async EditarProvincia(id, name, full_name, latitude, longitude, display_order) {
        try {
            await provinceRepository.EditarProvincia(id, name, full_name, latitude, longitude, display_order);
            return { message: 'Provincia actualizada correctamente?' };
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