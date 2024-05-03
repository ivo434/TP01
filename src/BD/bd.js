import 'dotenv/config'

export const BDConfig = {
    host: process.env.BD_SERVER,
    port: 5432,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
};