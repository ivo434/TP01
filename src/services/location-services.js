import LocationRepository from "../repositories/location-repository.js";
const locationRepository = new LocationRepository();
export default class LocationService {
    async GetAllLocations(limit, offset){
        try {
            return await locationRepository.GetAllLocations(limit, offset);
        } catch (error) {
            console.error('Error in GetAllLocations:', error);
            throw error;
        }
    }
    async getLocationById(id) {
        try {
            const location = await locationRepository.getLocationById(id);
            if (id === null) {
                return "404"
            }
            else{
                return location;
            }
        } catch (error) {
            console.error('Error in getProvinciaById:', error);
            throw error;
        }
    }
    async getEventLocationsByLocationId(user_id, location_id, limit, offset){
        try{
            const EventLocations = await locationRepository.getEventLocationsByLocationId(user_id, location_id, limit, offset)
            if (location_id === null) {
                return "404"
            }
            else{
                return EventLocations;
            }
        } catch (error) {
            console.error('Error in GetEventLocationsByLocationId:', error);
            throw error;
        }
    }
}
