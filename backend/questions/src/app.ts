import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import questionRouter from './questions/questionRouter';
import errorHandler from '../lib/errorHandler';

dotenv.config();
const app = express();
const port = process.env.PORT || 8081;
const corsOpts = {
  origin: '*'
};

app.use(cors(corsOpts));

app.use(express.json()); // Enable JSON request body parsing

// Import routes
app.use('/questions', questionRouter);

// Use this error handler for asyncHandler requests
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello, welcome to UVENTS!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
