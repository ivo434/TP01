import pkg from "jsonwebtoken";

export default async function decryptToken(token){
    token = token.split(' ')[1];
    let payloadOriginal = null;
    try {
        payloadOriginal = await pkg.verify(token, process.env.TOKEN_PASSWORD)
    } catch (error){
        console.log(error)
    }
    console.log(payloadOriginal)
    return payloadOriginal;
}
