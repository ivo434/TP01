import express from 'express';
import UserService from "../services/user-services.js"
import { createToken } from '../utils/token.js';
const router = express.Router();
const userService = new UserService();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const verif = verificacionLogin(username);
    if (verif != true) {
        return res.status(400).send({
            success: false,
            message: "El email es invalido.",
            token  : ""
        });
    }
    else {
        try{
            const token = await userService.verificacionUsuario(username, password);
            console.log(token)
            if (token != null) {
                return res.status(200).send({
                    success: true,
                    message: "User Logged",
                    token: token
                });   
            } else {
                return res.status(401).send({
                    success: false,
                    message: "Usuario o clave inválida.",
                    token: ""
                });
            }
        } catch (error){
            res.status(500).send({
                message:"Internal server error"
            })
        }
    }
});

router.post("/register", async (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    const checkIn = verificadorDeRegistro(first_name, last_name, username, password);
    if(checkIn === true){
        const id = await userService.crearUsuario(first_name, last_name, username, password)
        const user = [{
            id: id,
            username: username
        }];
        const token = createToken(user)
        return res.status(201).send({
            id: id,
            first_name: first_name,
            last_name: last_name,
            username: username,
            token: token,
            message: 'User registered successfully',
        });
    } else {
        return res.status(400).send({
            checkIn
        });
    }
});

const verificadorDeRegistro = (first_name, last_name, username, password) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(first_name.length)
    if (first_name === undefined || last_name === undefined || username === undefined || password === undefined) {
        return "Valores insuficientes"
    }
    else if(first_name.length < 3 || last_name.length < 3){
        return "El nombre y apellido son obligatorios y tienen que tener al menos 3 caracteres";
    }
    else if(!regex.test(username)){
        return "El formato de correo electrónico no es válido";
    }
    else if(password.length < 3){
        return "La contraseña debe tener al menos 3 caracteres";
    }
    else{
        return true;
    }
}
const verificacionLogin = (username) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(username)){
        return "El formato de correo electrónico no es válido";
    }
    else{
        return true;
    }
}
export default router;