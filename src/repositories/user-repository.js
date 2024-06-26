import pg from "pg";
import { BDConfig } from "../BD/bd.js";
import { createToken } from "../utils/token.js";

const client = new pg.Client(BDConfig);
client.connect();

export default class UserRepository {
    async LoginUsuario(username, password){
        try{
            var query = `SELECT id, username FROM Users WHERE username = '${username}' AND password = '${password}'`
            const {rows} = await client.query(query);
            if(rows != null){
                const token = createToken(rows);
                return token;
            }
            else{
                return null;
            }
        } catch (error){
            console.log(error);
        }
        
    }
    async RegisterUsuario(first_name, last_name, username, password){
        try{
            var query = `INSERT INTO Users (first_name, last_name, username, password) VALUES ('${first_name}', '${last_name}', '${username}', '${password}') RETURNING id`
            const value = await client.query(query);
            const insertedId = value.rows[0].id;
            console.log(value)
            console.log(insertedId)
            return insertedId;
        } catch (error){
            console.log(error);
        }
    }
}
