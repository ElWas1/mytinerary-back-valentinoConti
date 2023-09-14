import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js';

const router = express.Router();

const { getItineraries, getItinerariesByCityId, getItineraryById, postItinerary, updateItinerary, deleteItinerary, postComment, postActivities, getComments, deleteComment } = itineraryController;

router.get('/', getItineraries);

router.get('/', getItinerariesByCityId);

router.get('/:id', getItineraryById);

router.post('/', postItinerary);

router.put('/:id', updateItinerary);

router.delete('/:id', deleteItinerary);

router.post('/activities/:id', postActivities);

router.get('/comment/:id', getComments)

router.post('/comment/:id', postComment);

router.delete('/comment/:id', deleteComment)

export default router;