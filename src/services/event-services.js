import EventRepository from "../repositories/event-repository.js";
const eventRepository = new EventRepository();
class EventService {

    async getListadoEventos(limit, offset) {
        try {
            return await eventRepository.getListadoEventos(limit, offset);
        } catch (error) {
            console.error('Error in getListadoEventos:', error);
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
            console.error('Error in detalleEventos:', error);
            throw error;
        }
    }
    async CrearEvento(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) {
        try {
            return await eventRepository.CrearEvento(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        } catch (error) {
            console.error('Error in CrearEvento:', error);
            throw error;
        }
    }
    async BorrarEvento(id, id_creator_user) {
        try {
            const result = await eventRepository.BorrarEvento(id, id_creator_user);
            filas = result.rowCount;
        } catch (error) {
            console.error('Error in BorrarEvento:', error);
            throw error;
        }
        return filas;
    }
    async EditarEvento(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) {
        try {
            return await eventRepository.EditarEvento(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        } catch (error) {
            console.error('Error in EditarEvento:', error);
            throw error;
        }
    }
    async patchEnrollment(rating, description, attended, observation, id_event, id_user){
        const enrollment={
          id_event: id_event,
          id_user: id_user,
          rating: rating,
          observation: observation,
          attended: attended,
          description: description,
        }
        try {
            return await eventRepository.patchEnrollment(enrollment); // NO ESTA HECHO
        } catch (error) {
            console.error('Error in patchEnrollment', error);
            throw error;
        }
      }
    async postInscripcionEvento(id, id_user){
        try {
            return await eventRepository.postInscripcionEvento(id, id_user); // NO ESTA HECHO
        } catch (error) {
            console.error('Error in postInscripcionEvento', error);
            throw error;
        }
    }

}

export default EventService;
