import { jwt } from "jsonwebtoken";

export default async function decryptToken(token){
    token = token.split(' ')[1];
    let payloadOriginal = null;
    try {
        payloadOriginal = await jwt.verify(token, process.env.TOKEN_PASSWORD)
    } catch (error){
        console.log(error)
    }
    return payloadOriginal;
}
console.log(payloadOriginal)