import pkg from "jsonwebtoken";
import "dotenv/config"

export const createToken = (user) => {
    console.log(user)
    const payload = {
        id: user[0].id,
        username: user[0].username
    };
    const secretKey = process.env.TOKEN_PASSWORD;
    const options = {
        expiresIn : '1h',
        issuer : 'localhost'
    };

    return pkg.sign(payload,secretKey,options);
}

export const DecryptToken = (encryptedToken) => {
    const secretKey = process.env.TOKEN_PASSWORD;
    let token = encryptedToken;
    let payloadOriginal = null;
    try {
        payloadOriginal = pkg.verify(token, secretKey);
    } catch(e) {
        console.error(e);
    }
    return payloadOriginal;
};

export function AuthMiddleware(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized");
    } else{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const decryptToken = DecryptToken(token);
        req.user = decryptToken;
    }
    console.log("a")
    next();
}