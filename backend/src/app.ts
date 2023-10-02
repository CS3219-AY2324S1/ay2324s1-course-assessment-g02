import dotenv from 'dotenv';
import express from 'express';
import {
  parseCSVToCategories,
  parseCSVToQuestionsData,
  parseCSVToQuestionBodies
} from './data/questions/questionsData';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json()); // Enable JSON request body parsing

app.get('/populate-questions', async (req, res) => {
  try {
    const questionsData = await parseCSVToQuestionsData(); // Call the function

    // Do something with questionsData
    res.json(questionsData);
  } catch (error) {
    console.error('Error populating questions:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while populating questions.' });
  }
});

app.get('/populate-question-bodies', async (req, res) => {
  try {
    const questionBodies = await parseCSVToQuestionBodies(); // Call the function

    // Do something with questionBodies
    res.json(questionBodies);
  } catch (error) {
    console.error('Error populating question bodies:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while populating question bodies.' });
  }
});

app.get('/populate-categories', async (req, res) => {
  try {
    const categories = await parseCSVToCategories(); // Call the function

    // Do something with questionBodies
    res.json(categories);
  } catch (error) {
    console.error('Error populating categories:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while populating categories.' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, welcome to UVENTS!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
