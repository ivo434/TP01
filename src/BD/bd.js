import 'dotenv/config'

export const BDConfig = {
    host: process.env.BD_SERVER,
    port: 5432,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
};

//hola drakey, si ves esto te hago acordar que TENES QUE PONER TRY CATCH EN TODO. denada