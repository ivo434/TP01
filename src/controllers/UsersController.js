import express from "express";
import UserService from "../services/user-services.js"
import pkg from "jsonwebtoken";
const router = express.Router();
const userService = new UserService();
const options = {
    expiresIn : '1h',
    issuer : 'organizacion'
}

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const verificadorUsuario = userService.verificarUsuario(username, password);
    if (verificadorUsuario != false) {
        return res.status(200).send({
            success: true,
            message: "User Founded",
            token: token
        });   
    } else if (verificadorUsuario == false) {
        return res.status(401).send({
            success: false,
            message: "Username or password invalid",
            token: ""
        });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/register", (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    const crearUsuario = userService.crearUsuario(first_name, last_name, username, password);
    if(crearUsuario = true){
        const payload = {
            id: id,
            username: username,
        }
        const token = pkg.sign(payload, process.env.TOKEN_PASSWORD, options)
        console.log(token);
        return res.status(201).send({
            id: 0,
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

export default router;