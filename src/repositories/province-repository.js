import pg from "pg";
import { BDConfig } from "../BD/bd.js";

const client = new pg.Client(BDConfig);
client.connect();


export default class ProvinceRepository {
    async CrearProvincia(provincia){ // display_order >= 0 // query con trabajo en clase
        const query = 
        {
            text: `INSERT INTO provinces(name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5)`, //cada $ equivale a un valor, de izquierda a derecha
            values: [provincia.name, provincia.full_name, provincia.latitude, provincia.longitude, provincia.display_order]
        }
        const res = await client.query(query);
        return res.rowCount;
    }
    async BorrarProvincia(id){
        var query = `DELETE FROM provinces WHERE id = ${id}`;
        const res = await client.query(query);
        return res.rowCount;
    }
    async EditarProvincia(provincia){
        // Para arreglar: como hacer para que no comitee si select where id = @id es nulo
        var query = 'UPDATE provinces SET'
        if (provincia.name != null) {
            query += ` name = '${provincia.name}', `
        }
        if (provincia.full_name != null) {
            query += ` full_name = '${provincia.full_name}', `
        }
        if (provincia.latitude != null) {
            query += ` latitude = '${provincia.latitude}', `
        }
        if (provincia.longitude != null) {
            query += ` longitude = '${provincia.longitude}', `
        }
        if (provincia.display_order != null) {
            query += ` display_order = ${provincia.display_order}, `
        }
        if (query.endsWith(', ')){
            query = query.slice(0,-2)
        }
        query += ` WHERE id = ${provincia.id}`
        console.log(query)
        const res = await client.query(query);
        return res.rowCount;
    }
    async GetAllProvincias(limit, offset){
        var query = `SELECT * From provinces order by id Asc limit ${limit} offset ${offset}`
        const {rows} =  await client.query(query);
        return rows
    }
    async GetProvinciaById(id){
        var query = `SELECT * From provinces WHERE id = ${id}`
        const values =  await client.query(query);
        if (values.rowCount >= 1) {
            return values.rows
        }
        else{
            return values.rowCount
        }
    }
    async GetEventLocationByProvinceId(id_province){
        var query = `SELECT l.* FROM locations l JOIN provinces p ON l.id_province = p.id WHERE p.id = ${id_province}`;
        const values =  await client.query(query);
        if (values.rowCount >= 1) {
            return values.rows
        }
        else{
            return values.rowCount
        }
    }
}
