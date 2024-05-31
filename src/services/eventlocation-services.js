import EventLocationRepository from "../repositories/eventlocation-repository";
import EventLocation from "../entities/event-location"
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
    async CrearEventLocation(eventLocation){
        try {
            const res = await eventLocationRepository.CrearEventLocation(eventLocation);
            return res;
        } catch (error){
            console.error('Error in CrearEventLocation:', error);
            throw error;
        }
    }
    async UpdateEventLocation(eventLocation){
        try {
            const res = await eventLocationRepository.UpdateEventLocation(eventLocation);
            return res;
        } catch (error){
            console.error('Error in UpdateEventLocation:', error);
            throw error;
        }
    }
    async DeleteEventLocation(id, id_creator_user){
        try {
            const res = await eventLocationRepository.DeleteEventLocation(eventLocation);
            return res;
        } catch (error){
            console.error('Error in DeleteEventLocation:', error);
            throw error;
        }
    }
}
