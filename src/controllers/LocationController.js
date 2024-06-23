import express from 'express';
import LocationService from '../services/location-services.js';

const router = express.Router();
const locationService = new LocationService();
router.get('/', async (req, res) => {
    const { limit, offset } = req.query;
    try {
        const events = await locationService.getAllLocations(limit, offset);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const event = await locationService.getLocationById(req.params.id);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id', async (req, res) => {
    const { limit, offset } = req.query;
    try{
        const events = await locationService.GetEventLocationsByLocationId(req.params.id, limit, offset)
        res.json(events)
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default router;