import express from 'express';
import EventLocationService from '../services/eventlocation-services.js';
import EventLocation from "../entities/event-location.js"
import {Pagination} from "../utils/paginacion.js"
import { AuthMiddleware } from '../utils/token.js';

const router = express.Router();
const eventLocationService = new EventLocationService();
const pagination = new Pagination();

router.get('/', AuthMiddleware, async (req, res) => {
    let { limit, offset } = req.query;
    limit = pagination.parseLimit(limit);
    offset = pagination.parseOffset(offset);
    try {
        const collection = await eventLocationService.getEventLocations(req.user.id, limit, offset);
        const paginatedResponse = pagination.buildPaginationDto(limit, offset, collection, req.path);
        res.status(200).json({
            paginacion: paginatedResponse
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', AuthMiddleware, async (req, res) => {
    try {
        const event = await eventLocationService.getEventLocationById(req.params.id, req.user.id);
        if (!event) {
            return res.status(404).json({ error: 'El event_location no existe o no pertenece al usuario autenticado.' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', AuthMiddleware, async (req, res) => {
    const { id_location, name, full_address, max_capacity, latitude, longitude } = req.body;
    const newEventLocation = new EventLocation(
        null,
        id_location,
        name,
        full_address,
        max_capacity,
        latitude,
        longitude,
        req.user.id
    );
    try {
        const event = await eventLocationService.crearEventLocation(newEventLocation);
        if (!event) {
            return res.status(404).json({ error: 'El event_location no existe o no pertenece al usuario autenticado.' });
        }
        console.log(event)
        if (event !== 1) {
            res.status(400).json(event);
        } else {
            res.status(200).json("Eventlocation creado");
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/', AuthMiddleware, async (req, res) => {
    const { id, id_location, name, full_address, max_capacity, latitude, longitude } = req.body;
    const newEventLocation = new EventLocation(
        id,
        id_location,
        name,
        full_address,
        max_capacity,
        latitude,
        longitude,
        req.user.id
    );
    try {
        const event = await eventLocationService.updateEventLocation(newEventLocation);
        if (!event) {
            return res.status(404).json({ error: 'El event_location no existe o no pertenece al usuario autenticado.' });
        }
        if (event !== 1) {
            res.status(400).json(event);
        } else {
            res.status(200).json(event);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', AuthMiddleware, async (req, res) => {
    const id = req.params.id;
    const id_creator_user = req.user.id;
    try {
        const deletedEventLocation = await eventLocationService.deleteEventLocation(id, id_creator_user);
        if (!deletedEventLocation) {
            return res.status(404).json({ error: 'El event_location no existe o no pertenece al usuario autenticado.' });
        }
        res.status(200).json(deletedEventLocation);
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el evento' });
    }
});

export default router;
