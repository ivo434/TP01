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
    BorrarProvincia(id){
        var query = 'DELETE FROM provinces WHERE id = ' + id;
        const listQueryDB = query.execute(query);
        return {}
    }
    EditarProvincia(id, name, full_name, latitude, longitude, display_order){
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
        const listQueryDB = query.execute(query);
        return query
    }
    GetAllProvincias(){
        var query = 'SELECT * From provinces limit '  + limit + ' offset ' + offset
        const listQueryDB = query.execute(query);
        return query
    }
    GetProvinciasById(id){
        var query = 'SELECT * From provinces WHERE id = ' + id
        const listQueryDB = query.execute(query);
        return query
    }
}
