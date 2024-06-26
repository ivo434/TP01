import express from 'express';
import UserService from "../services/user-services.js"
import pkg from "jsonwebtoken";
const router = express.Router();
const userService = new UserService();
const options = {
    expiresIn : '1h',
    issuer : 'organizacion'
}

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const verif = verificacionLogin(username);
    if (!verif) {
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
                    message: "User Founded",
                    token: token
                });   
            } else {
                return res.status(400).send({
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
    if(checkIn){
        const id = await userService.crearUsuario(first_name, last_name, username, password)
        const payload = {
            id: id,
            username: username,
        }
        const token = pkg.sign(payload, process.env.TOKEN_PASSWORD, options)
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
            message: 'Error registering user',
        });
    }
});

const verificadorDeRegistro = (first_name, last_name, username, password) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!first_name || !last_name){
        return "El nombre y apellido son obligatorios";
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