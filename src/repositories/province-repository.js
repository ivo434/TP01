import pg from "pg";
import { BDConfig } from "../BD/bd.js";

const client = new pg.Client(BDConfig);
client.connect();


export default class ProvinceRepository {
    async CrearProvincia(name, full_name, latitude, longitude, display_order){ // display_order >= 0 // query con trabajo en clase
        const query = 
        {
            text: `INSERT INTO provinces(name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5)`, //cada $ equivale a un valor, de izquierda a derecha
            values: [name, full_name, latitude, longitude, display_order]
        }
        console.log(query.values)
        const result = await client.query(query)
        return result
    }
    async BorrarProvincia(id){
        var query = `DELETE FROM provinces WHERE id = ${id}`;
        return await client.query(query);
    }
    async EditarProvincia(id, name, full_name, latitude, longitude, display_order){
        // Para arreglar: como hacer para que no comitee si select where id = @id es nulo
        var query = 'UPDATE provinces SET'
        if (name != null) {
            query += ` name = '${name}', `
        }
        if (full_name != null) {
            query += ` full_name = '${full_name}', `
        }
        if (latitude != null) {
            query += ` latitude = '${latitude}', `
        }
        if (longitude != null) {
            query += ` longitude = '${longitude}', `
        }
        if (display_order != null) {
            query += ` display_order = ${display_order}, `
        }
        if (query.endsWith(', ')){
            query = query.slice(0,-2)
        }
        query += ` WHERE id = ${id}`
        console.log(query)
        const {rows} =  await client.query(query);
        return rows
    }
    async GetAllProvincias(limit, offset){
        var query = `SELECT * From provinces limit ${limit} offset ${offset}`
        const {rows} =  await client.query(query);
        return rows
    }
    async GetProvinciaById(id){
        var query = `SELECT * From provinces WHERE id = ${id}`
        const {rows} =  await client.query(query);
        return rows
    }
    async GetEventLocationByProvinceId(id_province, limit, offset){
        var query = `SELECT id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user FROM event_locations WHERE locations.id_province = ${id_province} INNER JOIN locations ON event_locations.id_location = locations.id limit ${limit} offset ${offset}`;
        const {rows} =  await client.query(query);
        return rows
    }
}
