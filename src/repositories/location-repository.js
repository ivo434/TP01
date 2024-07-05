import pg from "pg";
import { BDConfig } from "../BD/bd.js";

const client = new pg.Client(BDConfig);
client.connect();

export default class LocationRepository{
    async getAllLocations(limit, offset){
        var query = `SELECT * FROM locations limit ${limit} offset ${offset}`
        const {rows} = await client.query(query)
        return rows
    }
    async getLocationById(id){
        var query = `SELECT * FROM locations WHERE id = ${id}`
        const values = await client.query(query)
        if (values.rowCount >= 1) {
            return values.rows
        }
        else{
            return values.rowCount
        }
    }
    async getEventLocationsByLocationId(user_id, location_id, limit, offset){
        var query = `select * FROM event_locations LEFT JOIN locations ON 
        event_locations.id_location = locations.id WHERE locations.id = ${location_id}
         and event_locations.id_creator_user = ${user_id} limit ${limit} offset ${offset}`
         const values = await client.query(query)
         if (values.rowCount >= 1) {
            return values.rows
         }
         else{
             return values.rowCount
         }
    }
}