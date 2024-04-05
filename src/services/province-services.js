import { query } from "express";
class ProvinceService {
    CrearProvincia(name, full_name, latitude, longitude, display_order){ // display_order >= 0
        var query = 'INSERT INTO provinces VALUES ' + name + ', ' + full_name + ', ' + latitude + ', ' + longitude + ', ' + display_order;
        const listQueryDB = query.execute(query);
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
            query += ' name = ' + name
        }
        if (full_name != null) {
            query += ' full_name = ' + full_name
        }
        if (latitude != null) {
            query += ' latitude = ' + latitude
        }
        if (longitude != null) {
            query += ' longitude = ' + longitude
        }
        if (display_order != null) {
            query += ' display_order = ' + display_order
        }
        query += 'WHERE id = ' + id
        const listQueryDB = query.execute(query);
        return {}
    }
    GetAllProvincias(){
        var query = 'SELECT * From provinces limit '  + limit + ' offset ' + offset
        const listQueryDB = query.execute(query);
        return {}
    }
    GetProvinciasById(id){
        var query = 'SELECT * From provinces WHERE id = ' + id
        const listQueryDB = query.execute(query);
        return {}
    }
}