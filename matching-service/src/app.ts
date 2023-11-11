import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import matchRouter from './match/MatchController';

dotenv.config();
const app = express();
const port = process.env.MATCH_PORT || 8084;
app.use(cors());
app.use(bodyParser.json());

app.use('/match', matchRouter);

app.listen(port, () => {
  console.log(`Matching Server running on http://localhost:${port}/`);
});
