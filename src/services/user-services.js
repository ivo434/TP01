import userRepository from "../repositories/user-repository.js";
import pg from "pg";

const client = new pg.Client();
client.connect();

class UserService {
    async verifiacionUsuario(username, password) {
        try {
            return await userRepository.LoginUsuario(username, password);
        } catch (error) {
            console.error('Error in verificacionUsuario:', error);
            throw error;
        }
    }
    async crearUsuario(first_name, last_name, username, password) {
        try {
            return await userRepository.registerUsuario(first_name, last_name, username, password);
        } catch (error) {
            console.error('Error in crearUsuario:', error);
            throw error;
        }
    }
}
export default UserService