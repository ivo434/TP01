import EventRepository from "../repositories/event-repository.js";
import CrudRepository from "../repositories/CRUD.js";
const eventRepository = new EventRepository();
const crudRepository = new CrudRepository();
class EventService {

    async getListadoEventos(limit, offset) {
        try {
            return await eventRepository.getListadoEventos(limit, offset)
        } catch (error) {
            console.error('Error in getListadoEventos:', error);
            throw error;
        }
    }
    async getEvento(id, limit, offset) {
        try {
            return await eventRepository.getEvento(id, limit, offset)
        } catch (error) {
            console.error('Error in getEvento:', error);
            throw error;
        }
    }

    async busquedaEventos(name, category, startDate, tag, limit, offset) {
        try {
            return await eventRepository.busquedaEventos(name, category, startDate, tag, limit, offset);
        } catch (error) {
            console.error('Error in busquedaEventos:', error);
            throw error;
        }
    }

    async detalleEventos(id, limit, offset) {
        try {
            return await eventRepository.detalleEventos(id, limit, offset);
        } catch (error) {
            console.error('Error in detalleEventos:', error);
            throw error;
        }
    }
    async listaParticipantes(id_event, first_name, last_name, username, attended, rating, limit, offset) {
        try {
            return await eventRepository.listaParticipantes(id_event, first_name, last_name, username, attended, rating, limit, offset);
        } catch (error) {
            console.error('Error in listaParticipantes:', error);
            throw error;
        }
    }
    async CrearEvento(evento) {
        try {
            const values = [
                evento.id_event_location
            ];
            console.log(values)
            const max_capacity = await crudRepository.Get("SELECT max_capacity FROM event_locations WHERE id = $1", values);
            console.log(max_capacity)
            if (evento.name < 3 || evento.description < 3) {
                return "Nombre menor a 3"
            }
            else if (evento.max_assistance > max_capacity){
                return "Asistencia maxima mayor a capacidad maxima"
            }
            else if (evento.price < 0 || evento.duration_in_minutes < 0){
                return "Precio y duracion menores a 0"
            }
            else {
                return await eventRepository.CrearEvento(evento)
            }
        } catch (error) {
            console.error('Error in CrearEvento:', error);
            throw error;
        }
    }
    async BorrarEvento(id, id_creator_user) {
        try {
            const result = await eventRepository.BorrarEvento(id, id_creator_user);
            return result;
        } catch (error) {
            console.error('Error in BorrarEvento:', error);
            throw error;
        }
    }
    async EditarEvento(id, evento) {
        try {
            const values = [
                evento.id_event_location
            ];
            const max_capacity = await crudRepository.Get("SELECT max_capacity FROM event_locations WHERE id = $1", values);
            if (evento.name != null && evento.description != null && evento.name < 3 || evento.description < 3) {
                return "Nombre menor a 3"
            }
            else if (evento.max_assistance != null && evento.max_assistance > max_capacity){
                return "Asistencia maxima mayor a capacidad maxima"
            }
            else if (evento.price != null && evento.duration_in_minutes != null && evento.price < 0 || evento.duration_in_minutes < 0){
                return "Precio y duracion menores a 0"
            }
            else {
                return await eventRepository.EditarEvento(id, evento)
            }
        } catch (error) {
            console.error('Error in EditarEvento:', error);
            throw error;
        }
    }
    async enrollUserToEvent(eventEnrollment){
        try {
            return await eventRepository.enrollUserToEvent(eventEnrollment); // NO ESTA HECHO
        } catch (error) {
            console.error('Error in enrollUserToEvent', error);
            throw error;
        }
      }
      async removeUserFromEvent(eventId, userId){
        try {
            await eventRepository.removeUserFromEvent(eventId, userId); // NO ESTA HECHO
        } catch (error) {
            console.error('Error in enrollUserToEvent', error);
            throw error;
        }
      }
    async patchEnrollment(id_user, id_event, rating, observations){
        try {
            return await eventRepository.patchEnrollment(id_user, id_event, rating, observations); // NO ESTA HECHO
        } catch (error) {
            console.error('Error in postInscripcionEvento', error);
            throw error;
        }
    }

}

export default EventService;