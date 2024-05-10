import express from 'express';
import EventLocationService from '../services/eventlocation-services';

const router = express.Router();
const eventLocationService = new EventLocationService();
