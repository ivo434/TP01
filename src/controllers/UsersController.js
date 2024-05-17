import express from "express";
import UserService from "../services/user-services.js"
import { jwt } from "jsonwebtoken";
const router = express.Router();
const userService = new UserService();



const options = {
    expiresIn : '1h',
    issuer : 'organizacion'
}

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const verificadorUsuario = userService.verificarUsuario(username, password);
    if (!verificadorUsuario) {
        const payload = {
            id: id,
            username: username,
        }
        const token = jwt.sign(payload, process.env.TOKEN_PASSWORD, options)
        console.log(token);
        return res.status(201).send({
            token: token
        });   
    } else {
        return res.status(400).send({
            message: 'Error logging user',
        });
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
        const token = jwt.sign(payload, process.env.TOKEN_PASSWORD, options)
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

export default router;