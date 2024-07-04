import EventLocationRepository from "../repositories/eventlocation-repository.js";
const eventLocationRepository = new EventLocationRepository();
export default class EventLocationService {
    async getEventLocations(id_user, limit, offset){
        try {
            return await eventLocationRepository.getEventLocations(id_user, limit, offset);
        } catch (error) {
            console.error('Error in GetEventLocations:', error);
            throw error;
        }
    }
    async getEventLocationById(id, user_id) {
        try {
            const eventLocation = await eventLocationRepository.getEventLocationById(id, user_id);
            return eventLocation;
        } catch (error) {
            console.error('Error in getEventLocationById:', error);
            throw error;
        }
    }
    async crearEventLocation(eventLocation){
        try {
            const res = await eventLocationRepository.crearEventLocation(eventLocation);
            return res;
        } catch (error){
            console.error('Error in CrearEventLocation:', error);
            throw error;
        }
    }
    async updateEventLocation(eventLocation){
        try {
            const res = await eventLocationRepository.updateEventLocation(eventLocation);
            return res;
        } catch (error){
            console.error('Error in UpdateEventLocation:', error);
            throw error;
        }
    }
    async deleteEventLocation(id, id_creator_user){
        try {
            const res = await eventLocationRepository.deleteEventLocation(id, id_creator_user);
            return res;
        } catch (error){
            console.error('Error in DeleteEventLocation:', error);
            throw error;
        }
    }
}
