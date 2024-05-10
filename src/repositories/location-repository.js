import pg from "pg";
import { BDConfig } from "../BD/bd.js";

export default class LocationRepository{
    constructor(){
        const { Client } = pg;
        this.DBClient = new Client(BDConfig)
        this.DBClient.connect()
    }
    async GetAllLocations(limit,offset){
        var query = `SELECT id, name, id_province, latitude, longitude FROM locations limit ${limit} offset ${offset}`
        var values = await this.DBClient.query(query)
        return values
    }
    async GetLocationById(id){
        var query = `SELECT id, name, id_province, latitude, longitude FROM locations WHERE id = ${id}`
        var values = await this.DBClient.query(query)
        return values
    }
    async GetEventLocationsByLocationId(location_id, limit, offset){
        var query = `SELECT id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user FROM event_locations WHERE locations.id = ${location_id} INNER JOIN locations ON event_locations.id_location = locations.id limit ${limit} offset ${offset}`
        var values = await this.DBClient.query(query)
        return values
    }
}