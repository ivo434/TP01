import express from 'express';
import EventLocationService from '../services/eventlocation-services';
import decryptToken from '../utils/token';

const router = express.Router();
const eventLocationService = new EventLocationService();
router.get('/', async (req, res) => {
    const { limit, offset } = req.query;
    try {
        const events = await eventLocationService.getEventLocations(limit, offset);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const event = await eventLocationService.getEventLocationById(req.params.id);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/', async (req, res) => {
    const token = req.headers.authorization;
    const { id_location, name, full_address, max_capacity, latitude, longitude } = req.body;
    const payload = decryptToken(token);
    const id_creator_user = payload.id;
    const newEventLocation = new EventLocation(
        null,
        id_location,
        name,
        full_address,
        max_capacity,
        latitude,
        longitude,
        id_creator_user
    );
    try {
        const event = await eventLocationService.CrearEventLocation(newEventLocation);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/', async (req, res) => {
    const token = req.headers.authorization;
    const { id, id_location, name, full_address, max_capacity, latitude, longitude } = req.body;
    const payload = decryptToken(token);
    const id_creator_user = payload.id;
    const newEventLocation = new EventLocation (
        id,
        id_location,
        name,
        full_address,
        max_capacity,
        latitude,
        longitude,
        id_creator_user
    )
    try {
        const event = await eventLocationService.UpdateEventLocation(newEventLocation);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const id_creator_user = req.user.id;
    try {
        const deletedEventLocation = await deleteEventLocation(id, id_creator_user);
        if (!deletedEventLocation) {
            return res.status(404).json({ error: 'El event_location no existe o no pertenece al usuario autenticado.' });
        }
        res.status(200).json(deletedEventLocation);
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el evento' });
    }
});
export default router;