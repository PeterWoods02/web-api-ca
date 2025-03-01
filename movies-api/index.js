import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler'
import moviesRouter from './api/movies';   //import movies router
import ratingRoutes from './api/ratings';   
import authenticate from './authenticate/index.js'; // Adjusted path


dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use('/api', authenticate, ratingRoutes);
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});