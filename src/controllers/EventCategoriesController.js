import express from 'express';
import EventCategoryService from "../services/EventCategory-services.js";
import EventCategory from "../entities/event-categories.js";

const router = express.Router();
const eventCategoryService = new EventCategoryService();

router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const categories = await eventCategoryService.GetEventCategories(limit, offset);
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener todas las categorías:', error);
    res.status(500).json({ error: 'Error al obtener todas las categorías.' });
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const category = await eventCategoryService.getEventCategoryById(id);
    if (!category) {
      res.status(404).json({ error: 'Categoría de evento no encontrada.' });
    } else {
      res.json(category);
    }
  } catch (error) {
    console.error('Error al obtener la categoría por ID:', error);
    res.status(500).json({ error: 'Error al obtener la categoría por ID.' });
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, display_order } = req.body;
  try {
    const updatedCategory = new EventCategory(id, name, display_order);
    await eventCategoryService.UpdateEventCategory(updatedCategory);
    res.sendStatus(200);
  } catch (error) {
    if (error.message === 'El nombre debe tener al menos tres letras.') {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error al actualizar la categoría:', error);
      res.status(500).json({ error: 'Error al actualizar la categoría.' });
    }
  }
});

router.post('/', async (req, res) => {
  const { name, display_order } = req.body;
  const newCategory = new EventCategory(null, name, display_order);
  try {
    await eventCategoryService.CrearEventCategory(newCategory);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al insertar la categoría:', error);
    res.status(500).json({ error: 'Error al insertar la categoría.' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await eventCategoryService.DeleteEventCategory(id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al borrar la categoría:', error);
    res.status(500).json({ error: 'Error al borrar la categoría.' });
  }
});

export default router;