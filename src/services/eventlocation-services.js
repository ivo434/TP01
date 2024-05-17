import EventLocationRepository from "../repositories/eventlocation-repository";;
const eventLocationRepository = new EventLocationRepository();
export default class EventLocationService {
    async GetEventLocations(limit, offset){
        try {
            return await eventLocationRepository.GetEventLocations(limit, offset);
        } catch (error) {
            console.error('Error in GetEventLocations:', error);
            throw error;
        }
    }
    async getEventLocationById(id) {
        try {
            const eventLocation = await eventLocationRepository.getEventLocationById(id);
            return eventLocation;
        } catch (error) {
            console.error('Error in getEventLocationById:', error);
            throw error;
        }
    }
}
