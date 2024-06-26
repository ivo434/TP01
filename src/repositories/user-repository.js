import pg from "pg";
import { BDConfig } from "../BD/bd.js";

export default class UserRepository {
    constructor(){
        const { Client } = pg;
        this.DBClient = new Client(BDConfig)
        this.DBClient.connect()
    }
    async LoginUsuario(username, password){
        try{
            var query = `SELECT id, username FROM Usuarios WHERE username = ${username} && password = ${password}`
            const {rows} = await client.query(query);
            if(rows != null){
                const token = createToken(respuesta.rows);
                console.log(token);
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
            var query = `INSERT INTO Usuarios (first_name, last_name, username, password) VALUES ('${first_name}', '${last_name}', '${username}', '${password}') RETURNING id`
            const value = await client.query(query);
            const insertedId = value.rows[0].id;
            return insertedId;
        } catch (error){
            console.log(error);
        }
    }
}
