import LocationRepository from "../repositories/location-repository";;
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
            return location;
        } catch (error) {
            console.error('Error in getProvinciaById:', error);
            throw error;
        }
    }
    async GetEventLocationsByLocationId(location_id, limit, offset){
        try{
            const EventLocations = await locationRepository.GetEventLocationsByLocationId(location_id, limit, offset)
            return EventLocations
        } catch (error) {
            console.error('Error in GetEventLocationsByLocationId:', error);
            throw error;
        }
    }
}
