import provinceRepository from "../respositories/province-repository";
import pg from "pg";
import { BDConfig } from '../BD/bd';
import { query } from "express";

const client = new pg.Client();
client.connect();