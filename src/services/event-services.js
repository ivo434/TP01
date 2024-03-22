import { query } from "express";

class EventService{
    GetListadoEventos(limit, offset){
        // Ir a BD
        var query = 'select name , description , event_categories.name , event_locations.name , event_locations.full_address , start_date , duration_in_minutes , price , enabled_for_enrollment , max_assistance , users.first_name , users.last_name from events inner join event_locations on events.id_event_location = event_locations.id inner join event_categories on events.id_event_category = event_categories.id inner join users on events.id_creator_user = users.id limit ${limit} offset ${offset}'
        const listQueryDB = query.execute(query);
        return {}
    }
    BusquedaEventos(name, category, startDate, tag, limit, offset) {
        var query = 'SELECT name, event_categories.name, start_date, tags.name FROM events WHERE '

        if (name != null) {
            query += "name = @name AND "
        }
        if (category != null) {
            query += "category = @category AND "
        }
        if (startDate != null) {
            query += "startDate = @startDate AND "
        }
        if (tag != null) {
            query += "tag = @tag AND "
        }
        if (query.endsWith(" AND ")) {
            query = query.slice(0,-4);
        }
        else if (query.endsWith(" WHERE ")) {
            query = query.slice(0,-6);
        }
        query += " INNER JOIN event_categories ON events.id_event_category = event_categories.id INNER JOIN event_tags ON events.id = event_tags.id_event INNER JOIN tags ON event_tags.id_tag = tags.id limit ${limit} offset ${offset}"
        const listQueryDB = query.execute(query);
        return {}
    }
    DetalleEventos(limit, offset){
        // Ir a BD
        var query = 'SELECT * From events INNER JOIN event_locations ON id_event_location = event_locations.id INNER JOIN locations on event_locations.id = locations.id INNER JOIN provinces ON locations.id = provinces.id '
        const listQueryDB = query.execute(query);
        return {}
    }
}

export default EventService;