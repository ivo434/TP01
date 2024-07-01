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
        const {rows} =  await client.query(query);
        return rows
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
    async GetEventLocationByProvinceId(id_province){
        var query = `SELECT l.* FROM locations l JOIN provinces p ON l.id_province = p.id WHERE p.id = ${id_province}`;
        const {rows} =  await client.query(query);
        return rows
    }
}
