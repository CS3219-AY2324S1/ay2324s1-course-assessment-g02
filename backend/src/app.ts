import dotenv from 'dotenv';
import express from 'express';
import {
  parseCSVToQuestionsData,
  parseCSVToQuestionBodies
} from './data/questions/questionsData';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json()); // Enable JSON request body parsing

// Use the parseCSVToQuestionsData function
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

// Use the parseCSVToQuestionBodies function
app.get('/populate-question-bodies', async (req, res) => {
  try {
    const questionBodies = await parseCSVToQuestionBodies(); // Call the function

    // Do something with questionBodies
    res.json(questionBodies);
  } catch (error) {
    console.error('Error populating questions:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while populating questions.' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, welcome to UVENTS!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
