import pg from "pg";
import { BDConfig } from "../BD/bd.js";

export default class ProvinceRepository {
    constructor(){
        const { Client } = pg;
        this.DBClient = new Client(BDConfig)
        this.DBClient.connect()
    }
    async CrearProvincia(name, full_name, latitude, longitude, display_order){ // display_order >= 0 // query con trabajo en clase
        try{
            var query = 'INSERT INTO provinces(name, full_name, latitude, longitude, display_order) VALUES $1, $2, $3, $4, $5'; //cada $ equivale a un valor, de izquierda a derecha
            const values = [name, full_name, latitude, longitude, display_order]
            const result = await this.DBClient.query(sql, values)

            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            } else {
                //NT
            }
        }
        catch{
            console.error('Error in CrearProvincia');
        }
        return {}
    }
    async BorrarProvincia(id){
        var query = 'DELETE FROM provinces WHERE id = ' + id;
        const listQueryDB = await client.query(query);
        return {}
    }
    async EditarProvincia(id, name, full_name, latitude, longitude, display_order){
        var query = 'UPDATE provinces SET'
        if (name != null) {
            query += ' name = ' + name + ', '
        }
        if (full_name != null) {
            query += ' full_name = ' + full_name + ', '
        }
        if (latitude != null) {
            query += ' latitude = ' + latitude + ', '
        }
        if (longitude != null) {
            query += ' longitude = ' + longitude + ', '
        }
        if (display_order != null) {
            query += ' display_order = ' + display_order
        }
        if (query.endsWith(', ')){
            query.substring(0,-1)
        }
        query += 'WHERE id = ' + id
        const listQueryDB = await client.query(query);
        return query
    }
    async GetAllProvincias(){
        var query = 'SELECT * From provinces limit '  + limit + ' offset ' + offset
        const listQueryDB = await client.query(query);
        return query
    }
    async GetProvinciasById(id){
        var query = 'SELECT * From provinces WHERE id = ' + id
        const listQueryDB = await client.query(query);
        return query
    }
    async GetEventLocationByProvinceId(id_province, limit, offset){
        var query = `SELECT id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user FROM event_locations WHERE locations.id_province = ${id_province} INNER JOIN locations ON event_locations.id_location = locations.id limit ${limit} offset ${offset}`;
        const values = await client.query(query);
        return values;
    }
}
