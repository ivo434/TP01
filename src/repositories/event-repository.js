import pg from "pg";
import { BDConfig } from "../BD/bd.js";


const client = new pg.Client(BDConfig);

client.connect();
console.log('config', BDConfig)

export default class EventRepository{
    async getListadoEventos(limit, offset) {
        var query = `select events.id, events.name, 
        description, id_event_category, id_event_location, start_date, duration_in_minutes,
        price, enabled_for_enrollment, max_assistance, events.id_creator_user, 
        event_categories.id AS CategoryId,
        event_categories.name AS CategoryName,
        event_categories.display_order,
        event_locations.id AS EventLocationId,  
        event_locations.name AS EventLocationName,
        full_address,
        max_capacity, 
        event_locations.latitude AS EventLocationsLatitude, 
        event_locations.longitude AS EventLocationsLongitude,
        locations.id AS LocationId, 
        locations.name AS LocationName, 
        locations.latitude AS LocationLatitude,
        locations.longitude AS LocationLongitude,
        provinces.id AS ProvinceId, 
        provinces.name AS ProvinceName, 
        provinces.full_name AS ProvinceFullName, 
        provinces.latitude AS ProvinceLatitude, 
        provinces.longitude AS ProvinceLongitude, 
        provinces.display_order AS ProvinceDisplayOrder,
        users.id AS CreatorUserId, 
        first_name, 
        last_name, 
        username, 
        password
            FROM events
        INNER JOIN users ON events.id_creator_user = users.id
        INNER JOIN event_categories ON events.id_event_category = event_categories.id
        INNER JOIN event_locations ON events.id_event_location = event_locations.id
        INNER JOIN locations ON event_locations.id_location = locations.id
        INNER JOIN provinces ON locations.id_province = provinces.id`;
        query += ` LIMIT ${limit} OFFSET ${offset}`
        const {rows} = await client.query(query);
        return rows;
    }
    async getEvento(id, limit, offset) {
        var query = `select events.id, events.name, 
        description, id_event_category, id_event_location, start_date, duration_in_minutes,
        price, enabled_for_enrollment, max_assistance, events.id_creator_user, 
        event_categories.id AS CategoryId,
        event_categories.name AS CategoryName,
        event_categories.display_order,
        event_locations.id AS EventLocationId,  
        event_locations.name AS EventLocationName,
        full_address,
        max_capacity, 
        event_locations.latitude AS EventLocationsLatitude, 
        event_locations.longitude AS EventLocationsLongitude,
        locations.id AS LocationId, 
        locations.name AS LocationName, 
        locations.latitude AS LocationLatitude,
        locations.longitude AS LocationLongitude,
        provinces.id AS ProvinceId, 
        provinces.name AS ProvinceName, 
        provinces.full_name AS ProvinceFullName, 
        provinces.latitude AS ProvinceLatitude, 
        provinces.longitude AS ProvinceLongitude, 
        provinces.display_order AS ProvinceDisplayOrder,
        users.id AS CreatorUserId, 
        first_name, 
        last_name, 
        username, 
        password
            FROM events
        INNER JOIN users ON events.id_creator_user = users.id
        INNER JOIN event_categories ON events.id_event_category = event_categories.id
        INNER JOIN event_locations ON events.id_event_location = event_locations.id
        INNER JOIN locations ON event_locations.id_location = locations.id
        INNER JOIN provinces ON locations.id_province = provinces.id
        WHERE events.id = ${id}`;
        const {rows} = await client.query(query);
        return rows;
    }
    async busquedaEventos(name, category, startdate, tag, limit, offset) {
        var query = `select events.id, events.name, 
        description, id_event_category, id_event_location, start_date, duration_in_minutes,
        price, enabled_for_enrollment, max_assistance, events.id_creator_user, 
        event_categories.id AS CategoryId,
        event_categories.name AS CategoryName,
        event_categories.display_order,
        event_locations.id AS EventLocationId,  
        event_locations.name AS EventLocationName,
        full_address,
        max_capacity, 
        event_locations.latitude AS EventLocationsLatitude, 
        event_locations.longitude AS EventLocationsLongitude,
        locations.id AS LocationId, 
        locations.name AS LocationName, 
        locations.latitude AS LocationLatitude,
        locations.longitude AS LocationLongitude,
        provinces.id AS ProvinceId, 
        provinces.name AS ProvinceName, 
        provinces.full_name AS ProvinceFullName, 
        provinces.latitude AS ProvinceLatitude, 
        provinces.longitude AS ProvinceLongitude, 
        provinces.display_order AS ProvinceDisplayOrder,
        users.id AS CreatorUserId, 
        first_name, 
        last_name, 
        username, 
        password
            FROM events
        INNER JOIN users ON events.id_creator_user = users.id
        INNER JOIN event_categories ON events.id_event_category = event_categories.id
        INNER JOIN event_locations ON events.id_event_location = event_locations.id
        INNER JOIN locations ON event_locations.id_location = locations.id
        INNER JOIN provinces ON locations.id_province = provinces.id
        WHERE `;
        if (name != null) {
            query += `events.name ILIKE '%${name}%' AND `;
        }
        if (category != null) {
            query += `event_categories.name ILIKE '%${category}%' AND `;
        }
        if (startdate != null) {
            query += `start_date = '%${startdate}%' AND `;
        }
        if (tag != null) {
            query += `tags.name ILIKE '%${tag}%' AND `;
        }
        if (query.endsWith(' AND ')) {
            query = query.slice(0, -5);
        } else if (query.endsWith(' WHERE ')) {
            query = query.slice(0, -7);
        }
        query += ` LIMIT ${limit} OFFSET ${offset}`
        console.log(query)
        const {rows} = await client.query(query);
        return rows;
    }
    
    async ListaParticipantes(id_event, first_name, last_name, username, attended, rating, limit, offset){
        if (attended != true && attended != null || attended != false && attended != null) {
            return "Error"
        }
        else {
            var query =`SELECT first_name, last_name, username FROM users 
            WHERE event_enrollments.id_event = ${id_event} 
            INNER JOIN event_enrollments 
            ON users.id = event_enrollments.id_user HAVING `
            if (first_name != null) {
                query += `first_name = '${first_name}' AND `;
            }
            if (last_name != null) {
                query += `last_name = '${last_name}' AND `;
            }
            if (username != null) {
                query += `username = '${username}' AND `;
            }
            if (attended != null) {
                query += `attended = '${attended}' AND `;
            }
            if (rating != null) {
                query += `rating > '${rating}' AND `; //podría no estar el AND al final pero lo dejamos en caso de tener que añadir más en un futuro.
            }
            if (query.endsWith(' AND ')) {
                query = query.slice(0,-4);
            }
            else if (query.endsWith(' HAVING ')) {
                query = query.slice(0,-7);
            }
            query += ` LIMIT ${limit} OFFSET ${offset}`;
            const values = await client.query(query);
        return values;
        }
    }
    async CrearEvento(name, description, id_event_category, id_event_location, start_date, 
        duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){ // display_order >= 0
        var query = `INSERT INTO events (name, description, id_event_category, id_event_location, 
            start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
            VALUES ('${name}', '${description}', ${id_event_category}, ${id_event_location}, '${start_date}', 
            ${duration_in_minutes}, ${price}, ${enabled_for_enrollment}, ${max_assistance}, ${id_creator_user})`;
        const listQueryDB = query.execute(query);
        const values = await client.query(query);
        return values;
    }
    async BorrarEvento(id, id_creator_user){
        var query = `DELETE FROM events WHERE id = ${id} AND id_creator_user = ${id_creator_user}`;
        const values = await client.query(query);
        return values;
    }
    async EditarEvento(id, name, description, id_event_category, id_event_location, start_date, 
        duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        var query = 'UPDATE events SET'
        if (name != null) {
            query += `name = '${name}', `;
        }
        if (description != null) {
            query += `description = '${description}', `;
        }
        if (id_event_category != null) {
            query += `id_event_category = '${id_event_category}', `;
        }
        if (id_event_location != null) {
            query += `id_event_location = '${id_event_location}', `;
        }
        if (start_date != null) {
            query += `start_date = '${start_date}', `;
        }
        if (duration_in_minutes != null) {
            query += `duration_in_minutes = '${duration_in_minutes}', `;
        }
        if (price != null) {
            query += `price = '${price}', `;
        }
        if (enabled_for_enrollment != null) {
            query += `enabled_for_enrollment = ${enabled_for_enrollment}, `;
        }
        if (max_assistance != null) {
            query += `max_assistance = '${max_assistance}', `;
        }
        if (query.endsWith(', ')){
            query.substring(0,-1)
        }
        query += updates.join(', ') + ` WHERE id = ${id} AND id_creator_user = ${id_creator_user}`;
        try {
            await client.query(query);
            console.log('Evento actualizado');
        } catch (error) {
            console.error('Error al actualizar el evento', error.stack);
            throw error;
        }
    }
    async enrollUserToEvent(eventEnrollment) {
        const query = `
            INSERT INTO event_enrollment (id_event, id_user, description, registration_date_time, attended, observations, rating)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [
            eventEnrollment.id_event,
            eventEnrollment.id_user,
            eventEnrollment.description,
            eventEnrollment.registration_date_time,
            eventEnrollment.attended,
            eventEnrollment.observations,
            eventEnrollment.rating
        ];
        try {
            await client.query(query, values);
            console.log('Usuario inscrito exitosamente en el evento');
        } catch (error) {
            console.error('Error al inscribir al usuario en el evento', error.stack);
            throw error;
        }
    } 
    async removeUserFromEvent(eventEnrollmentId, userId) {
        const query = `
            DELETE FROM event_enrollment
            WHERE id = $1 && id_user = $2
        `;
        const values = [eventEnrollmentId, userId];
        try {
            await client.query(query, values);
            console.log('Usuario removido exitosamente del evento');
        } catch (error) {
            console.error('Error al remover al usuario del evento', error.stack);
            throw error;
        }
    }
}
