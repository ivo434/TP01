import express from 'express';
import EventLocationService from '../services/eventlocation-services';

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
export default router;