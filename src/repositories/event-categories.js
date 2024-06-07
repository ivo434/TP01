import pg from "pg";
import { BDConfig } from "../BD/bd.js";

export default class EventCategoryRepository{
    constructor(){
        const { Client } = pg;
        this.DBClient = new Client(BDConfig)
        this.DBClient.connect()
    }
    async GetAllCategories(limit, offset){
        var query = `SELECT id, name, display_order FROM event_categories LIMIT ${limit} OFFSET ${offset}`
        const values = await client.query(query);
        return values;
    }
    async GetCategoriesById(id, limit, offset){
        var query = `SELECT id, name, display_order FROM event_categories WHERE id = ${id} LIMIT ${limit} OFFSET ${offset}`
        const values = await client.query(query);
        return values;
    }
    async InsertCategory(Categoria){
        var query = `INSERT INTO event_categories(name, display_order) VALUES ($1, $2)`
        const values = [
            Categoria.name,
            Categoria.display_order
        ]
        try {
            await client.query(query, values);
            console.log('Categoria insertada exitosamente');
        } catch (error) {
            console.error('Error al insertar la categoria', error.stack);
            throw error;
        }
    }
    async UpdateCategory(Categoria){
        var query = `UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3`
        const values = [
            Categoria.name,
            Categoria.display_order,
            Categoria.id
        ]
        try {
            if (Categoria.name < 3) {
                console.log('Nombre menor a 3 letras')
            }
            else{
                await client.query(query, values);
                console.log('Categoria actualizada exitosamente');
            }
        } catch (error) {
            console.error('Error al actualizar la categoria', error.stack);
            throw error;
        }
    }
}