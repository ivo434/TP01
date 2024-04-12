import pg from "pg";
import { BDConfig } from '../BD/bd';
import { query } from "express";

const client = new pg.Client();
client.connect();

class EventRepository{
    GetListadoEventos(limit, offset){
        // Ir a BD
        var query = 'select name , description , event_categories.name , event_locations.name , event_locations.full_address , start_date , duration_in_minutes , price , enabled_for_enrollment , max_assistance , users.first_name , users.last_name from events inner join event_locations on events.id_event_location = event_locations.id inner join event_categories on events.id_event_category = event_categories.id inner join users on events.id_creator_user = users.id limit ' + limit + ' offset ' + offset
        const listQueryDB = query.execute(query);
        return {}
    }
    BusquedaEventos(name, category, startDate, tag, limit, offset) {
        var query = 'SELECT name, event_categories.name, start_date, tags.name FROM events WHERE '
        if (name != null) {
            query += 'name = ' + name +  ' AND ';
        }
        if (category != null) {
            query += 'category = ' + category + ' AND ';
        }
        if (startDate != null) {
            query += 'startDate = ' + startDate + ' AND ';
        }
        if (tag != null) {
            query += 'tag = ' + tag + ' AND ';
        }
        if (query.endsWith(' AND ')) {
            query = query.slice(0,-4);
        }
        else if (query.endsWith(' WHERE ')) {
            query = query.slice(0,-6);
        }
        query += ' INNER JOIN event_categories ON events.id_event_category = event_categories.id INNER JOIN event_tags ON events.id = event_tags.id_event INNER JOIN tags ON event_tags.id_tag = tags.id limit ' + limit + ' offset ' + offset
        const listQueryDB = query.execute(query);
        return {}
    }
    DetalleEventos(id, limit, offset){
        // Ir a BD
        // Terminar el query cuando tengamos la base de datos, solo faltaria poner los datos uno por uno
        var query = 'SELECT * From events WHERE id = ' + id + ' INNER JOIN event_locations ON id_event_location = event_locations.id INNER JOIN locations on event_locations.id = locations.id INNER JOIN provinces ON locations.id = provinces.id limit ' + limit + ' offset ' + offset
        const listQueryDB = query.execute(query);
        return {}
    }

    ListaParticipantes(id_event, first_name, last_name, username, attended, rating, limit, offset){
        if (attended != true && attended != null || attended != false && attended != null) {
            return "Error"
        }
        else {
            var query ='SELECT first_name, last_name, username FROM users WHERE event_enrollments.id_event = ' + id_event + ' INNER JOIN event_enrollments ON users.id = event_enrollments.id_user HAVING '
            if (first_name != null) {
                query += 'first_name = ' + first_name + ' AND '
            }
            if (last_name != null) {
                query += 'last_name = ' + last_name + ' AND '
            }
            if (username != null) {
                query += 'username = ' + username + ' AND '
            }
            if (attended != null) {
                query += 'attended = ' + attended + ' AND '
            }
            if (rating != null) {
                query += 'rating > ' + rating + ' AND ' //podría no estar el AND al final pero lo dejamos en caso de tener que añadir más en un futuro.
            }
            if (query.endsWith(' AND ')) {
                query = query.slice(0,-4);
            }
            else if (query.endsWith(' HAVING ')) {
                query = query.slice(0,-7);
            }
            query += ' limit ' + limit + ' offset ' + offset
            const listQueryDB = query.execute(query);
            return {}
        }
    }
    CrearEvento(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){ // display_order >= 0
        var query = 'INSERT INTO provinces (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES ' + name + ', ' + description + ', ' + id_event_category + ', ' + id_event_location + ', ' + start_date + ', ' + duration_in_minutes + ', ' + price + ', ' + enabled_for_enrollment + ', ' + max_assistance + ", " + id_creator_user;
        const listQueryDB = query.execute(query);
        return {}
    }
    BorrarEvento(id, id_creator_user){
        var query = 'DELETE FROM provinces WHERE id = ' + id + ' AND id_creator_user = ' + id_creator_user;
        const listQueryDB = query.execute(query);
        return {}
    }
    EditarEvento(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        var query = 'UPDATE events SET'
        if (name != null) {
            query += ' name = ' + name + ', '
        }
        if (description != null) {
            query += ' description = ' + description + ', '
        }
        if (id_event_category != null) {
            query += ' id_event_category = ' + id_event_category + ', '
        }
        if (id_event_location != null) {
            query += ' id_event_location = ' + id_event_location + ', '
        }
        if (start_date != null) {
            query += ' start_date = ' + start_date + ', '
        }
        if (duration_in_minutes != null) {
            query += ' duration_in_minutes = ' + duration_in_minutes + ', '
        }
        if (price != null) {
            query += ' price = ' + price + ', '
        }
        if (enabled_for_enrollment != null) {
            query += ' enabled_for_enrollment = ' + enabled_for_enrollment + ', '
        }
        if (max_assistance != null) {
            query += ' max_assistance = ' + max_assistance
        }
        if (query.endsWith(', ')){
            query.substring(0,-1)
        }
        query += 'WHERE id = ' + id + ' AND id_creator_user = ' + id_creator_user
        const listQueryDB = query.execute(query);
        return {}
    }
}
export default EventService;
//client.query("SELECT * FROM events");