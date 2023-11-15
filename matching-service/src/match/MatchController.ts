// MatchController.ts
import express from 'express';
import MatchService from './MatchService';

const router = express.Router();
const matchService = new MatchService();

router.get('/get', async (req, res) => {
  const { id } = req.query;
  console.log(`Received request to get user session for user: ${id}`);
  const result = await matchService.checkUser(id as string);
  res.json(result);
});

router.get('/find', async (req, res) => {
  const { id, difficulty, language, userId } = req.query;
  console.log(
    `Received request to find match for ${id}, ${difficulty}, ${language}`
  );

  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    return res.status(400).json({ error: 'Invalid id, must be a number' });
  }

  const result = await matchService.getMatch(
    userId as string,
    difficulty as string,
    language as string,
    idNumber
  );

  return res.json(result);
});

router.delete('/delete', async (req, res) => {
  const { id, difficulty, language } = req.query;
  await matchService.deleteMatch(
    id as string,
    difficulty as string,
    language as string
  );
  res.json({ message: 'Deleted' });
});

export default router;
