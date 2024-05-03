import pg from "pg";
import { BDConfig } from "../BD/bd.js";

export default class EventRepository{
    constructor(){
        const { Client } = pg;
        this.DBClient = new Client(BDConfig)
        this.DBClient.connect()
    }
    async getListadoEventos(limit, offset) {
        var query = `SELECT name, description, event_categories.name, event_locations.name, event_locations.full_address, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, users.first_name, users.last_name FROM events INNER JOIN event_locations ON events.id_event_location = event_locations.id INNER JOIN event_categories ON events.id_event_category = event_categories.id INNER JOIN users ON events.id_creator_user = users.id LIMIT ${limit} OFFSET ${offset}`;
        const values = await client.query(query);
        return values;
    }
    busquedaEventos(name, category, startDate, tag, limit, offset) {
        var query = `SELECT name, event_categories.name, start_date, tags.name FROM events WHERE `;
        if (name != null) {
            query += `name = '${name}' AND `;
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
            query = query.slice(0, -5);
        } else if (query.endsWith(' WHERE ')) {
            query = query.slice(0, -7);
        }
        query += ` INNER JOIN event_categories ON events.id_event_category = event_categories.id INNER JOIN event_tags ON events.id = event_tags.id_event INNER JOIN tags ON event_tags.id_tag = tags.id LIMIT ${limit} OFFSET ${offset}`;
        const values = client.query(query);
        return values;
    }

    detalleEventos(id) {
        var query = `SELECT * FROM events WHERE id = ${id} INNER JOIN event_locations ON id_event_location = event_locations.id INNER JOIN locations ON event_locations.id = locations.id INNER JOIN provinces ON locations.id = provinces.id`;
        // Execute the query, handle errors, and return result
        const values = client.query(query);
        return values; // Placeholder, handle errors and return result
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
            query += ` LIMIT ${limit} OFFSET ${offset}`;
            const values = client.query(query);
        return values;
        }
    }
    CrearEvento(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){ // display_order >= 0
        var query = `INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES ('${name}', '${description}', ${id_event_category}, ${id_event_location}, '${start_date}', ${duration_in_minutes}, ${price}, ${enabled_for_enrollment}, ${max_assistance}, ${id_creator_user})`;        const listQueryDB = query.execute(query);
        const values = client.query(query);
        return values;
    }
    BorrarEvento(id, id_creator_user){
        var query = `DELETE FROM events WHERE id = ${id} AND id_creator_user = ${id_creator_user}`;
        const values = client.query(query);
        return values;
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
        query += updates.join(', ') + ` WHERE id = ${id} AND id_creator_user = ${id_creator_user}`;
        const listQueryDB = query.execute(query);
        const values = client.query(query);
        return values;
    }
}