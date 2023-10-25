import express from 'express';
import RedisCacheService from './redisCacheService';
import cors from 'cors';

const client = new RedisCacheService();
const app = express();
const corsOpts = {
  origin: '*'
};
app.use(cors(corsOpts));
app.get('/keys/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const value = await client.get(key); // Added await keyword here

    if (value === null) {
      return res.status(404).send('Key not found');
    }

    res.json({ key, value });
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).send(err);
  }
});

app.post('/keys/:key/value/:value', async (req, res) => {
  try {
    const { key, value } = req.params;
    console.log(req.params);

    if (!key || value === undefined) {
      return res.status(400).json({ message: 'Key and value are required.' });
    }

    await client.set(key, value);
    return res.status(201).json({ message: 'Key set successfully.' });
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).send(err);
  }
});

app.delete('/keys/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const isDeleted = await client.delete(key);

    if (isDeleted) {
      return res.status(200).json({ message: 'Key deleted successfully.' });
    }

    return res.status(404).json({ message: 'Key not found.' });
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
