import express from 'express';
import cityController from '../controllers/city.controller.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import passport from '../middlewares/passport.js';

const router = express.Router();

const { getCities, getCityById, postCity, updateCity, deleteCity } = cityController;

router.get('/', getCities);

router.get('/:id', getCityById);

router.post('/', passport.authenticate('jwt', { session: false }), postCity);

router.put('/:id', updateCity);

router.delete('/:id', deleteCity);

export default router;