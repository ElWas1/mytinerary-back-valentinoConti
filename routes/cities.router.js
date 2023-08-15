import express from 'express';
import cityController from '../controllers/city.controller.js';

const router = express.Router();

const { getCities, getCityById, postCity, deleteCity } = cityController;

router.get('/', getCities);

router.get('/:id', getCityById);

router.post('/', postCity);

router.delete('/:id', deleteCity)

export default router;