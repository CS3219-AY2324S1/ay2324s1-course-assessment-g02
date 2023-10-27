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
  const { id, difficulty, language } = req.query;
  console.log(
    `Received request to find match for ${id}, ${difficulty}, ${language}`
  );
  const result = await matchService.getMatch(
    id as string,
    difficulty as string,
    language as string
  );
  res.json(result);
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
