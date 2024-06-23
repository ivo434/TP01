import EventRepository from "../repositories/event-repository.js";
import Event from "../entities/event.js";
import EventLocation from "../entities/event-location.js";
import EventCategory from "../entities/event-categories.js";
import User from "../entities/user.js";
import Province from "../entities/province.js";
import Location from "../entities/location.js";
const eventRepository = new EventRepository();
class EventService {

    async getListadoEventos(limit, offset) {
    const basePath = "api/event"
        try {
            const answer = await eventRepository.getListadoEventos(limit, offset)
            return Mapping(limit, offset, basePath, answer)
        } catch (error) {
            console.error('Error in getListadoEventos:', error);
            throw error;
        }
    }
    async getEvento(id, limit, offset) {
        try {
            const answer = await eventRepository.getEvento(id, limit, offset)
            return Mapping(limit, offset, basePath, answer)
        } catch (error) {
            console.error('Error in getEvento:', error);
            throw error;
        }
    }

    async busquedaEventos(name, category, startDate, tag, limit, offset) {
        try {
            const answer = await eventRepository.busquedaEventos(name, category, startDate, tag, limit, offset);
            return Mapping(limit, offset, basePath, answer)
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

function Mapping(limit, offset, basePath, answer){
    const totalCount = answer.length
    const Result = answer.map(row =>{
        var event = new Event(row.id, row.name, 
            row.description, row.id_event_category, row.id_event_location, row.start_date, row.duration_in_minutes,
            row.price, row.enabled_for_enrollment, row.max_assistance, row.id_creator_user);
var eventcategory = new EventCategory(row.categoryid, row.categoryname, row.display_order);
var eventlocation = new EventLocation(row.eventlocationid, row.eventlocationname, row.locationid, row.full_address,
             row.max_capacity, row.eventlocationslatitude, row.eventlocationslongitude, row.creatoruserid);
var location = new Location(row.locationid, row.locationname, row.provinceid, row.locationlatitude, row.locationlongitude);
var province = new Province(row.provinceid, row.provincename, row.provincefullname, row.provincelatitude, row.provincelongitude, row.provincedisplayorder);
var creatoruser = new User(row.creatoruserid, row.first_name, row.last_name, row.username, row.password);
        return{
            event: event,
            creatoruser: creatoruser,
            eventcategories: eventcategory,
            eventlocations: eventlocation,
            locations: location,
            province: province,
            creatoruser: creatoruser,
            pagination: {
                limit: limit,
                offset: offset,
                nextPage: ((offset + 1) * limit <= totalCount) ? `${process.env.BASE_URL}/${basePath}?limit=${limit}&offset=${offset + 1}` : null,
                total: totalCount
            }
        }
    })
    return Result;
}