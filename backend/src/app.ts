import dotenv from 'dotenv';
import express from 'express';
import dataRouter from './data/questions/dataRouter';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json()); // Enable JSON request body parsing

// Import routes
app.use('/data', dataRouter);

app.get('/', (req, res) => {
  res.send('Hello, welcome to UVENTS!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
