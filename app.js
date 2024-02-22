import 'dotenv/config.js';
import './config/database.js';
import createError from 'http-errors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import indexRouter from './routes/index.router.js';

import { __dirname } from './utils.js';

const app = express();

app.set('trust proxy', 1);

const limiter = rateLimit({
  // First value = mins
  windowMs: 15 * 60 * 1000,
  max: 600,
  message: 'Too many requests from this IP adress, try again later.'
});

app.use(limiter)

app.use(morgan('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
