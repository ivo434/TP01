import pg from "pg";
import { BDConfig } from "../BD/bd.js";
import Event from "../entities/event.js";
import CrudRepository from "./CRUD.js";

const crudRepository = new CrudRepository()
const client = new pg.Client(BDConfig);
client.connect();

export default class EventRepository{
    async getListadoEventos(limit, offset) {
        var query = `SELECT 
        events.id,
        events.name,
        description,
        id_event_category,
        id_event_location,
        start_date,
        duration_in_minutes,
        price,
        enabled_for_enrollment,
        max_assistance,
        events.id_creator_user,
        json_build_object(
            'id', event_categories.id,
            'name', event_categories.name,
            'display_order', event_categories.display_order
        ) AS event_category,
        json_build_object(
            'id', event_locations.id,
            'name', event_locations.name,
            'full_address', full_address,
            'max_capacity', max_capacity,
            'latitude', event_locations.latitude,
            'longitude', event_locations.longitude
        ) AS event_location,
        json_build_object(
            'id', locations.id,
            'name', locations.name,
            'latitude', locations.latitude,
            'longitude', locations.longitude
        ) AS location,
        json_build_object(
            'id', provinces.id,
            'name', provinces.name,
            'full_name', provinces.full_name,
            'latitude', provinces.latitude,
            'longitude', provinces.longitude,
            'display_order', provinces.display_order
        ) AS province,
        json_build_object(
            'id', users.id,
            'first_name', first_name,
            'last_name', last_name,
            'username', username,
            'password', password
        ) AS creator_user,
        array(
            SELECT
                json_build_object(
                    'id', tags.id,
                    'name', tags.name
                ) 
            FROM tags
            LEFT JOIN event_tags ON tags.id = event_tags.id_tag
            WHERE event_tags.id_event = events.id
            ) AS tags
    FROM events
    LEFT JOIN users ON events.id_creator_user = users.id
    LEFT JOIN event_categories ON events.id_event_category = event_categories.id
    LEFT JOIN event_locations ON events.id_event_location = event_locations.id
    LEFT JOIN locations ON event_locations.id_location = locations.id
    LEFT JOIN provinces ON locations.id_province = provinces.id`;
        query += ` LIMIT ${limit} OFFSET ${offset}`
        const {rows} = await client.query(query);
        return rows;
    }
    async getEvento(id) {
        var query = `SELECT 
        events.id,
        events.name,
        description,
        id_event_category,
        id_event_location,
        start_date,
        duration_in_minutes,
        price,
        enabled_for_enrollment,
        max_assistance,
        events.id_creator_user,
        json_build_object(
            'id', event_categories.id,
            'name', event_categories.name,
            'display_order', event_categories.display_order
        ) AS event_category,
        json_build_object(
            'id', event_locations.id,
            'name', event_locations.name,
            'full_address', full_address,
            'max_capacity', max_capacity,
            'latitude', event_locations.latitude,
            'longitude', event_locations.longitude
        ) AS event_location,
        json_build_object(
            'id', locations.id,
            'name', locations.name,
            'latitude', locations.latitude,
            'longitude', locations.longitude
        ) AS location,
        json_build_object(
            'id', provinces.id,
            'name', provinces.name,
            'full_name', provinces.full_name,
            'latitude', provinces.latitude,
            'longitude', provinces.longitude,
            'display_order', provinces.display_order
        ) AS province,
        json_build_object(
            'id', users.id,
            'first_name', first_name,
            'last_name', last_name,
            'username', username,
            'password', password
        ) AS creator_user,
        array(
            SELECT
                json_build_object(
                    'id', tags.id,
                    'name', tags.name
                ) 
            FROM tags
            LEFT JOIN event_tags ON tags.id = event_tags.id_tag
            WHERE event_tags.id_event = events.id
            ) AS tags
    FROM events
    LEFT JOIN users ON events.id_creator_user = users.id
    LEFT JOIN event_categories ON events.id_event_category = event_categories.id
    LEFT JOIN event_locations ON events.id_event_location = event_locations.id
    LEFT JOIN locations ON event_locations.id_location = locations.id
    LEFT JOIN provinces ON locations.id_province = provinces.id
        WHERE events.id = ${id}`;
        const values = await client.query(query)
        if (values.rowCount >= 1) {
            return values.rows
        }
        else{
            return values.rowCount
        }
    }
    async busquedaEventos(name, category, startdate, tag, limit, offset) {
        var query = `SELECT 
        events.id,
        events.name,
        description,
        id_event_category,
        id_event_location,
        start_date,
        duration_in_minutes,
        price,
        enabled_for_enrollment,
        max_assistance,
        events.id_creator_user,
        json_build_object(
            'id', event_categories.id,
            'name', event_categories.name,
            'display_order', event_categories.display_order
        ) AS event_category,
        json_build_object(
            'id', event_locations.id,
            'name', event_locations.name,
            'full_address', full_address,
            'max_capacity', max_capacity,
            'latitude', event_locations.latitude,
            'longitude', event_locations.longitude
        ) AS event_location,
        json_build_object(
            'id', locations.id,
            'name', locations.name,
            'latitude', locations.latitude,
            'longitude', locations.longitude
        ) AS location,
        json_build_object(
            'id', provinces.id,
            'name', provinces.name,
            'full_name', provinces.full_name,
            'latitude', provinces.latitude,
            'longitude', provinces.longitude,
            'display_order', provinces.display_order
        ) AS province,
        json_build_object(
            'id', users.id,
            'first_name', first_name,
            'last_name', last_name,
            'username', username,
            'password', password
        ) AS creator_user,
        array(
            SELECT
                json_build_object(
                    'id', tags.id,
                    'name', tags.name
                ) 
            FROM tags
            LEFT JOIN event_tags ON tags.id = event_tags.id_tag
            WHERE event_tags.id_event = events.id
            ) AS tags
    FROM events
    LEFT JOIN users ON events.id_creator_user = users.id
    LEFT JOIN event_categories ON events.id_event_category = event_categories.id
    LEFT JOIN event_locations ON events.id_event_location = event_locations.id
    LEFT JOIN locations ON event_locations.id_location = locations.id
    LEFT JOIN provinces ON locations.id_province = provinces.id
    LEFT JOIN event_tags et ON events.id = et.id_event
    LEFT JOIN tags t ON et.id_tag = t.id
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
            query += `t.name ILIKE '%${tag}%' AND `;
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
    
    async listaParticipantes(id_event, first_name, last_name, username, attended, rating, limit, offset){
            var query =`SELECT
            ee.id,
            ee.id_event,
            ee.id_user,
            json_build_object(
                'id', u.id,
                'first_name', u.first_name,
                'last_name', u.last_name,
                'username', u.username,
                'password', u.password
            ) AS user,
            ee.description,
            ee.registration_date_time,
            ee.attended,
            ee.observations,
            ee.rating
            FROM
            event_enrollments ee
            LEFT JOIN users u
			ON U.id = ee.id_user
            WHERE ee.id_event = ${id_event} AND `
            if (first_name != null) {
                query += `first_name ILIKE '%${first_name}%' AND `;
            }
            if (last_name != null) {
                query += `last_name ILIKE '%${last_name}%' AND `;
            }
            if (username != null) {
                query += `username ILIKE '%${username}%' AND `;
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
            console.log(query)
            const values = await client.query(query)
            if (values.rowCount >= 1) {
                return values.rows
            }
            else{
                return values.rowCount
            }
    }
    async CrearEvento(evento){ // display_order >= 0
        var query = `INSERT INTO events (name, description, id_event_category, id_event_location, 
            start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        const valuesArray = Object.values(evento);
        valuesArray.shift()
        const res = await client.query(query, valuesArray);
        return res.rowCount;
    }
    async BorrarEvento(id, id_creator_user){
        if(crudRepository.Get('select * from event_enrollments where id_event = $1', [id]) === null){
            return "400"
        }
        else{
            var query = `DELETE FROM events WHERE id = ${id} AND id_creator_user = ${id_creator_user}`;
            const res = await client.query(query);
            return res.rowCount;
        }
    }
    async EditarEvento(id, evento){
        var query = 'UPDATE events SET '
        if (evento.name != null) {
            query += `name = '${evento.name}', `;
        }
        if (evento.description != null) {
            query += `description = '${evento.description}', `;
        }
        if (evento.id_event_category != null) {
            query += `id_event_category = '${evento.id_event_category}', `;
        }
        if (evento.id_event_location != null) {
            query += `id_event_location = '${evento.id_event_location}', `;
        }
        if (evento.start_date != null) {
            query += `start_date = '${evento.start_date}', `;
        }
        if (evento.duration_in_minutes != null) {
            query += `duration_in_minutes = '${evento.duration_in_minutes}', `;
        }
        if (evento.price != null) {
            query += `price = '${evento.price}', `;
        }
        if (evento.enabled_for_enrollment != null) {
            query += `enabled_for_enrollment = ${evento.enabled_for_enrollment}, `;
        }
        if (evento.max_assistance != null) {
            query += `max_assistance = '${evento.max_assistance}', `;
        }
        if (query.endsWith(', ')){
            query = query.slice(0,-2)
        }
        query += ` WHERE id = ${id} AND id_creator_user = ${evento.id_creator_user}`;
        console.log(query)
        try {
            const res = await client.query(query);
            return res.rowCount;
        } catch (error) {
            console.error('Error al actualizar el evento', error.stack);
            throw error;
        }
    }
    async enrollUserToEvent(eventEnrollment) {
        const query = `
            INSERT INTO event_enrollments (id_event, id_user, description, registration_date_time, attended, observations, rating)
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
            console.log('Usuario inscrito exitosamente en el evento');
            const res = await client.query(query, values);
            return res.rowCount;
        } catch (error) {
            console.error('Error al inscribir al usuario en el evento', error.stack);
            throw error;
        }
    } 
    async removeUserFromEvent(eventEnrollmentId, userId) {
        const query = `
            DELETE FROM event_enrollments
            WHERE id_event = $1 AND id_user = $2
        `;
        const values = [eventEnrollmentId, userId];
        try {
            const res = await client.query(query, values);
            return res.rowCount;
        } catch (error) {
            console.error('Error al remover al usuario del evento', error.stack);
            throw error;
        }
    }
    async patchEnrollment(id_user, id_event, rating, observations){
        var query = `
            UPDATE event_enrollments SET attended = true, rating = $1, observations = $2 WHERE id_user = $3 and id_event = $4
        `;
        const values = [
            rating,
            observations,
            id_user,
            id_event
        ]
        try {
            await client.query(query, values);
            console.log('Usuario puso su rating exitosamente');
        } catch (error) {
            console.error('Error al ponerle rating a un evento', error.stack);
            throw error;
        }
    }
}
