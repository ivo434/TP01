import express from 'express';
import LocationService from '../services/location-services.js';
import { Pagination } from '../utils/paginacion.js';
import { AuthMiddleware } from '../utils/token.js';

const pagination = new Pagination();
const router = express.Router();
const locationService = new LocationService();

router.get('/', async (req, res) => {
    let { limit, offset } = req.query;
    limit = pagination.parseLimit(limit)
    offset = pagination.parseOffset(offset)
    try {
        const collection = await locationService.getAllLocations( limit, offset);
        const paginatedResponse = pagination.buildPaginationDto(limit, offset, collection, req.path);
        res.status(200).json({
            paginacion: paginatedResponse
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const location = await locationService.getLocationById(req.params.id);
        if (!location) {
            res.status(404).json("ID inexistente")
        } else {
            res.status(200).json(location);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:id/event_location', AuthMiddleware, async (req, res) => {
    let { limit, offset } = req.query;
    limit = pagination.parseLimit(limit)
    offset = pagination.parseOffset(offset)
    try {
        const collection = await locationService.getEventLocationsByLocationId(req.user.id, req.params.id, limit, offset)
        if (!collection) {
            res.status(404).json("ID inexistente o no asociado")
        } else {
            const paginatedResponse = pagination.buildPaginationDto(limit, offset, collection, req.path);
            res.status(200).json({
                paginacion: paginatedResponse
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default router;