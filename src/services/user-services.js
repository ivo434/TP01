import userRepository from "../respositories/user-repository";
import pg from "pg";
import { BDConfig } from '../BD/bd';
import { query } from "express";

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