import express, { Request, Response } from 'express';

const app = express();
const port = 4001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, welcome to PeerPrep matching-service!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
