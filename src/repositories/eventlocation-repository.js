import pg from "pg";
import { BDConfig } from "../BD/bd.js";

export default class EventLocationRepository{
    constructor(){
        const { Client } = pg;
        this.DBClient = new Client(BDConfig)
        this.DBClient.connect()
    }
    async GetEventLocations(limit, offset){
        var query = `SELECT id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user FROM event_locations limit ${limit} offset ${offset}`;
        const values = await client.query(query);
        return values;
    }
    async GetEventLocationById(id){
        var query = `SELECT id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user FROM event_locations WHERE id = ${id}`;
        const values = await client.query(query);
        return values;
    }
}