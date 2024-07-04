import pg from "pg";
import { BDConfig } from "../BD/bd.js";

const client = new pg.Client(BDConfig);
client.connect();

export default class EventCategoryRepository{
    async getAllCategories(limit, offset){
        var query = `SELECT * FROM event_categories LIMIT ${limit} OFFSET ${offset}`
        const {rows} = await client.query(query)
        return rows
    }
    async getCategoriesById(id){
        var query = `SELECT * FROM event_categories WHERE id = ${id}`
        const {rows} = await client.query(query)
        return rows
    }
    async insertCategory(Categoria){
        var query = `INSERT INTO event_categories(name, display_order) VALUES ($1, $2)`
        const values = [
            Categoria.name,
            Categoria.display_order
        ]
        try {
            const res = await client.query(query, values);
            return res.rowCount;
            console.log('Categoria insertada exitosamente');
        } catch (error) {
            console.error('Error al insertar la categoria', error.stack);
            throw error;
        }
    }
    async updateCategory(Categoria){
        var query = `UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3`
        const values = [
            Categoria.name,
            Categoria.display_order,
            Categoria.id
        ]
        try {
            const res = await client.query(query, values);
            return res.rowCount;
            console.log('Categoria actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar la categoria', error.stack);
            throw error;
        }
    }
    async deleteCategory(id){
        var query = `DELETE FROM event_categories WHERE id = ${id}`
        try {
            const res = await client.query(query, values);
            return res.rowCount;
            console.log('Categoria borrada exitosamente');
        } catch (error) {
            console.error('Error al borrar la categoria', error.stack);
            throw error;
        }
    }   
}