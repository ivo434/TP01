import express from 'express';
import EventService from './EventService';

const router = express.Router();
const eventService = new EventService();

router.get('/', async (req, res) => {
    const { limit, offset } = req.query;
    try {
        const events = await eventService.getListadoEventos(limit, offset);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/', async (req, res) => {
    const { name, category, startDate, tag, limit, offset } = req.query;
    try {
        const events = await eventService.busquedaEventos(name, category, startDate, tag, limit, offset);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/', async (req, res) => {
    const { id } = req.params;
    const { limit, offset } = req.query;
    try {
        const event = await eventService.detalleEventos(id, limit, offset);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    const {id_event, first_name, last_name, username, attended, rating, limit, offset } = req.query;
    try {
        const event = await eventService.detalleEventos(id_event, first_name, last_name, username, attended, rating, limit, offset);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/', async (req, res) => {
    const eventData = req.body;
    try {
        const newEvent = await eventService.CrearEvento(...Object.values(eventData));
        res.json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/', async (req, res) => {
    const { id } = req.params;
    const { id_creator_user } = req.body;
    try {
        await eventService.BorrarEvento(id, id_creator_user);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/', async (req, res) => {
    const { id } = req.params;
    const eventData = req.body;
    try {
        await eventService.EditarEvento(id, ...Object.values(eventData));
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
