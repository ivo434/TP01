import express from 'express';
import EventCategoryService from "../services/eventcategory-services.js";
import EventCategory from "../entities/event-categories.js";
import { Pagination } from '../utils/paginacion.js';

const router = express.Router();
const eventCategoryService = new EventCategoryService();
const pagination = new Pagination();

router.get('/', async (req, res) => {
  let { limit, offset } = req.query;
  limit = pagination.parseLimit(limit)
  offset = pagination.parseOffset(offset)
  try {
    const collection = await eventCategoryService.getEventCategories(limit, offset);
    const paginatedResponse = pagination.buildPaginationDto(limit, offset, collection, req.path);
    res.status(200).json({
      paginacion: paginatedResponse
    });
  } catch (error) {
    console.error('Error al obtener todas las categorías:', error);
    res.status(500).json({ error: 'Error al obtener todas las categorías.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await eventCategoryService.getEventCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'el id sea inexistente' });
    }
    res.status(200).json(category)
  } catch (error) {
    console.error('Error al obtener la categoría por ID:', error);
    res.status(500).json({ error: 'Error al obtener la categoría por ID.' });
  }
});

router.post('/', async (req, res) => {
  const { name, display_order } = req.body;
  const newCategory = new EventCategory(null, name, display_order);
  const verif = verificarPost(name);
  try {
    if (verif === true) {
      await eventCategoryService.crearEventCategory(newCategory);
      res.status(200).json("Categoria creada");
    }
    else {
      res.status(400).json(verif)
    }
  } catch (error) {
    console.error('Error al insertar la categoría:', error);
    res.status(500).json({ error: 'Error al insertar la categoría.' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, display_order } = req.body;
  const updatedCategory = new EventCategory(req.params.id, name, display_order);
  const verif = verificarPut(name);
  try {
    if (verif === true) {
      const category = await eventCategoryService.updateEventCategory(updatedCategory);
      if (!category) {
        res.status(404).json({ error: 'el id sea inexistente' });
      } else{
        res.status(200).json("Categoria actualizada");
      }
    }
    else {
      res.status(400).json(verif)
    }
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await eventCategoryService.deleteEventCategory(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'el id sea inexistente' });
    }
    else {
      res.status(200).json("Categoria borrada");
    }
  } catch (error) {
    console.error('Error al borrar la categoría:', error);
    res.status(500).json({ error: 'Error al borrar la categoría.' });
  }
});

function verificarPost(name){
  if (name === undefined) {
    return "Valores indefinidos"
  }
  else if (name.length < 3) {
    return "Nombre menor a 3 o igual a 0"
  }
  else {
    return true
  }
}

function verificarPut(name){
  var values = true
  if (name !== undefined) {
    if (name.length < 3) {
      values = "Nombre menor a 3 o igual a 0"
    } 
  }
  return values
}

export default router;