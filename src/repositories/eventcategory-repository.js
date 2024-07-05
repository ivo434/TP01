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
        const values = await client.query(query)
        if (values.rowsCount >= 1) {
            return values.rows
        }
        else{
            return values.rowCount
        }
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
        } catch (error) {
            console.error('Error al insertar la categoria', error.stack);
            throw error;
        }
    }
    async updateCategory(Categoria){
        var query = `UPDATE event_categories SET `
        var values = []
        let paramIndex = 1;
        if (Categoria.name != null) {
            query += `name = $${paramIndex}, `
            paramIndex++;
            values.push(Categoria.name)
        }
        if (Categoria.display_order != null) {
            query += `display_order = $${paramIndex}, `
            paramIndex++;
            values.push(Categoria.display_order)
        }
        if (query.endsWith(', ')) {
            query = query.slice(0, -2);
        }
        query += ` WHERE id = $${paramIndex}`
        values.push(Categoria.id)
        console.log(query)
        try {
            const res = await client.query(query, values);
            return res.rowCount;
        } catch (error) {
            console.error('Error al actualizar la categoria', error.stack);
            throw error;
        }
    }
    async deleteCategory(id){
        var query = `DELETE FROM event_categories WHERE id = ${id}`
        try {
            const res = await client.query(query);
            return res.rowCount;
        } catch (error) {
            console.error('Error al borrar la categoria', error.stack);
            throw error;
        }
    }   
}