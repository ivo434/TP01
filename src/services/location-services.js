import LocationRepository from "../repositories/location-repository.js";
const locationRepository = new LocationRepository();
export default class LocationService {
    async getAllLocations(limit, offset){
        try {
            return await locationRepository.getAllLocations(limit, offset);
        } catch (error) {
            console.error('Error in GetAllLocations:', error);
            throw error;
        }
    }
    async getLocationById(id) {
        try {
            const location = await locationRepository.getLocationById(id);
            return location
        } catch (error) {
            console.error('Error in getProvinciaById:', error);
            throw error;
        }
    }
    async getEventLocationsByLocationId(user_id, location_id, limit, offset){
        try{
            const EventLocations = await locationRepository.getEventLocationsByLocationId(user_id, location_id, limit, offset)
            return EventLocations
        } catch (error) {
            console.error('Error in GetEventLocationsByLocationId:', error);
            throw error;
        }
    }
}