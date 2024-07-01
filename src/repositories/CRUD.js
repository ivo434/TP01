import pg from "pg";
import { BDConfig } from "../BD/bd.js";
import { query } from "express";

const client = new pg.Client(BDConfig);
client.connect();


export default class CrudRepository {
    async Create(query, values){ // display_order >= 0 // query con trabajo en clase
        const query = 
        {
            text: query, //cada $ equivale a un valor, de izquierda a derecha
            values: values
        }
        const result = await client.query(query)
        return result
    }
    async Delete(query, values){
        const query = 
        {
            text: query, //cada $ equivale a un valor, de izquierda a derecha
            values: values
        }
        const {rows} =  await client.query(query);
        return rows
    }
    async Update(query, values){
        const query = 
        {
            text: query, //cada $ equivale a un valor, de izquierda a derecha
            values: values
        }
        const {rows} =  await client.query(query);
        return rows
    }
    async Get(query,values){
        const query = 
        {
            text: query, //cada $ equivale a un valor, de izquierda a derecha
            values: values
        }
        const {rows} =  await client.query(query);
        return rows
    }
}
