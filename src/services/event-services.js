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
            console.log(max_capacity[0].max_capacity)
            if (evento.name.length < 3 || evento.description.length < 3) {
                return "Nombre menor a 3"
            }
            else if (evento.max_assistance > parseInt(max_capacity[0].max_capacity)){
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
            var verif = "";
            if (evento.name !== undefined) {
                if (evento.name.length < 3) {
                    verif = "Nombre menor a 3"
                }
            }
            else if (evento.description !== undefined) {
                if (evento.description.length < 3) {
                    verif = "Descripcion menor a 3"
                }
            }
            else if (evento.max_assistance !== undefined){
                if (evento.max_assistance > parseInt(max_capacity[0].max_capacity)) {
                    verif = "Asistencia maxima mayor a capacidad maxima"
                }
            }
            else if (evento.price !== undefined){
                if (evento.price < 0) {
                    verif = "Precio menor a 0"
                }
            }
            else if (evento.duration_in_minutes !== undefined) {
                if (evento.duration_in_minutes < 0) {
                    verif = "Duracion menor a 0"
                }
            }
            if (verif === "") {
                return await eventRepository.EditarEvento(id, evento)
            } else{
                return verif
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
            return await eventRepository.removeUserFromEvent(eventId, userId); // NO ESTA HECHO
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