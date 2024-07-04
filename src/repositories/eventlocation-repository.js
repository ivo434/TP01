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
    async getEventLocationById(id){
        var query = `SELECT * FROM event_locations WHERE id = ${id} and id_creator_user = ${id_user}`;
        const {rows} = await client.query(query)
        return rows
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
    async updateEventLocation(eventLocation){
        const query = `
        UPDATE event_locations
        SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6
        WHERE id = $7 AND id_creator_user = $8;
        `;
        const values = [
            eventLocation.id_location,
            eventLocation.name,
            eventLocation.full_address,
            eventLocation.max_capacity,
            eventLocation.latitude,
            eventLocation.longitude,
            eventLocation.id,
            eventLocation.id_creator_user
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
    if (!data.name || data.name.length < 3) {
        return 'El nombre debe tener al menos tres letras.';
    }
    if (!data.full_address || data.full_address.length < 3) {
        return 'La dirección debe tener al menos tres letras.';
    }
    if (data.max_capacity <= 0) {
        return 'La capacidad máxima debe ser un número positivo.';
    }
    if (!isValidLocationId(data.id_location)) {
        return 'El id_location es inexistente.';
    }
    else {
        return data;
    }
}