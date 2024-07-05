import pg from "pg";
import { BDConfig } from "../BD/bd.js";

const client = new pg.Client(BDConfig);
client.connect();

export default class EventLocationRepository{
    async getEventLocations(id_user, limit, offset){
        var query = `SELECT * FROM event_locations WHERE id_creator_user = ${id_user} limit ${limit} offset ${offset}`;
        const {rows} = await client.query(query)
        return rows
    }
    async getEventLocationById(id, id_user){
        var query = `SELECT * FROM event_locations WHERE id = ${id} and id_creator_user = ${id_user}`;
        const values =  await client.query(query);
        if (values.rowsCount >= 1) {
            return values.rows
        }
        else{
            return values.rowCount
        }
    }
    async crearEventLocation(eventLocation){
        const query = ` INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const values = [
            eventLocation.id_location,
            eventLocation.name,
            eventLocation.full_address,
            eventLocation.max_capacity,
            eventLocation.latitude,
            eventLocation.longitude,
            eventLocation.id_creator_user,
        ];
        try {
            const res = validateEventLocation(eventLocation);
            if (res !== eventLocation) {
                return res
            }
            else{
                const res = await client.query(query, values);
                return res.rowCount;
            }
        } catch (error) {
            console.error('Error ejecutando la consulta', error);
            throw error;
        }
    }
    async updateEventLocation(eventLocation) {
        var values = [];
        var query = `
        UPDATE event_locations
        SET `;
        let paramIndex = 1;
        if (eventLocation.id_location != null) {
            query += `id_location = $${paramIndex}, `;
            paramIndex++;
            values.push(eventLocation.id_location);
        }
        if (eventLocation.name != null) {
            query += `name = $${paramIndex}, `;
            paramIndex++;
            values.push(eventLocation.name);
        }
        if (eventLocation.full_address != null) {
            query += `full_address = $${paramIndex}, `;
            paramIndex++;
            values.push(eventLocation.full_address);
        }
        if (eventLocation.max_capacity != null) {
            query += `max_capacity = $${paramIndex}, `;
            paramIndex++;
            values.push(eventLocation.max_capacity);
        }
        if (eventLocation.latitude != null) {
            query += `latitude = $${paramIndex}, `;
            paramIndex++;
            values.push(eventLocation.latitude);
        }
        if (eventLocation.longitude != null) {
            query += `longitude = $${paramIndex}, `;
            paramIndex++;
            values.push(eventLocation.longitude);
        }
        if (query.endsWith(', ')) {
            query = query.slice(0, -2);
        }
        query += ` WHERE id = $${paramIndex} AND id_creator_user = $${paramIndex + 1};`
        console.log(query)
        values.push(eventLocation.id)
        values.push(eventLocation.id_creator_user)
        try {
            const res = validateEventLocation(eventLocation);
            if (res !== eventLocation) {
                return res
            }
            else{
                console.log(values)
                const res = await client.query(query, values);
                return res.rowCount;
            }
        } catch (error) {
            console.error('Error ejecutando la consulta', error);
            throw error;
        }
    }
    async deleteEventLocation(id, id_creator_user){
        const query = `
        DELETE FROM event_locations
        WHERE id = $1 AND id_creator_user = $2
        `;
        const values = [id, id_creator_user];
        try {
            const res = await client.query(query, values);
            return res.rowCount;
        } catch (error) {
            console.error('Error ejecutando la consulta', error.stack);
            throw error;
        }
    }
}

function validateEventLocation(data) {
    console.log(data)
    if (data.name.length < 3) {
        return 'El nombre debe tener al menos tres letras.';
    }
    if (data.full_address.length < 3) {
        return 'La dirección debe tener al menos tres letras.';
    }
    if (data.max_capacity <= 0) {
        return 'La capacidad máxima debe ser un número positivo.';
    }
    else {
        return data;
    }
}