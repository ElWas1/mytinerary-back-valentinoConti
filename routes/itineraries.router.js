import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js';

const router = express.Router();

const { getItineraries, getItinerariesByCityId, getItineraryById, postItinerary, updateItinerary, deleteItinerary } = itineraryController;

router.get('/', getItineraries);

router.get('/', getItinerariesByCityId);

router.get('/:id', getItineraryById);

router.post('/', postItinerary);

router.put('/:id', updateItinerary);

router.delete('/:id', deleteItinerary);

export default router;