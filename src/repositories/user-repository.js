import pg from "pg";
import { BDConfig } from "../BD/bd.js";

export default class UserRepository {
    constructor(){
        const { Client } = pg;
        this.DBClient = new Client(BDConfig)
        this.DBClient.connect()
    }
    LoginUsuario(username, password){
        
    }
    RegisterUsuario(first_name, last_name, username, password){

    }
}