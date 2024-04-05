import pg from "pg";
import { BDConfig } from '../BD/bd';

const client = new pg.Client();
client.connect();

//client.query("SELECT * FROM events");