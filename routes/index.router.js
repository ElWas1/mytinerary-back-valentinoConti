import express from 'express';
import userRouter from './users.router.js';
import cityRouter from './cities.router.js';
import itineraryRouter from './itineraries.router.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the index.')
});

router.use('/users', userRouter);

router.use('/cities', cityRouter);

router.use('/itineraries', itineraryRouter);

export default router;