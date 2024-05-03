import pg from "pg";
import { BDConfig } from "../BD/bd.js";
const client = new pg.Client(BDConfig);
client.connect();
export default class UserRepository {
    // constructor(){
    //     const { Client } = pkg;
    //     this.DBClient = new Client(BDConfig)
    //     this.DBClient.connect()
    // }
    LoginUsuario(username, password){
        
    }
    RegisterUsuario(first_name, last_name, username, password){

    }
}