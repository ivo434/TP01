import express from 'express';
import LocationService from '../services/location-services';;

const router = express.Router();
const locationService = new LocationService();