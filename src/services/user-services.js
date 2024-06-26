import UserRepository from "../repositories/user-repository.js";
const userRepository = new UserRepository()

class UserService {
    async verificacionUsuario(username, password) {
        try {
            const token = await userRepository.LoginUsuario(username, password);
            return token;
        } catch (error) {
            console.error('Error in verificacionUsuario:', error);
            throw error;
        }
    }
    async crearUsuario(first_name, last_name, username, password) {
        try {
            return await userRepository.RegisterUsuario(first_name, last_name, username, password);
        } catch (error) {
            console.error('Error in crearUsuario:', error);
            throw error;
        }
    }
}
export default UserService