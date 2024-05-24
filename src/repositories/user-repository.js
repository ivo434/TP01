import pg from "pg";
import { BDConfig } from "../BD/bd.js";

export default class UserRepository {
    constructor(){
        const { Client } = pg;
        this.DBClient = new Client(BDConfig)
        this.DBClient.connect()
    }
    async LoginUsuario(username, password){
        var query = `SELECT id, username FROM Usuarios WHERE username = ${username} && password = ${password}`
        const values = await client.query(query);
        return values;
    }
    async RegisterUsuario(first_name, last_name, username, password){
        if (first_name != null && last_name != null && first_name < 3 && last_name < 3 && emailCheck(username) && password != null && password < 3) {
            var query = `INSERT INTO Usuarios (first_name, last_name, username, password) VALUES ('${first_name}', '${last_name}', '${username}', '${password}')`
            const values = await client.query(query);
            return values;
        }
        else {
            return error;
        }
    }
}
function emailCheck(emailField){
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if( validEmail.test(emailField) ){
		alert('Username is valid, continue with form submission');
		return true;
	}else{
		alert('Username is invalid, skip form submission');
		return false;
	}
}