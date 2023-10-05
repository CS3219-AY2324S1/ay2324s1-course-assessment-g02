import express from 'express';
import { parseCSVToCategories, parseCSVToQuestions } from './questionsData';

const dataRouter = express.Router();

export default dataRouter;

// Populates all data; should only be called once on an empty db
dataRouter.post('/categories-and-questions', async (req, res) => {
  try {
    await parseCSVToCategories().then(async () => {
      await parseCSVToQuestions();
    });
    res.json({ message: 'Successfully populated all data.' });
  } catch (error) {
    console.error('Error populating data:', error);
    res.status(500).json({ error: 'An error occurred while populating data.' });
  }
});

// FOR TESTING: Below are the individual routes for populating each table
// Populate categories
dataRouter.post('/categories', async (req, res) => {
  try {
    const categories = await parseCSVToCategories(); // Call the function

    res.json(categories);
  } catch (error) {
    console.error('Error populating categories:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while populating categories.' });
  }
});

// Populate questions without bodies
dataRouter.post('/questions', async (req, res) => {
  try {
    const questionsData = await parseCSVToQuestions(); // Call the function

    // Do something with questionsData
    res.json(questionsData);
  } catch (error) {
    console.error('Error populating questions:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while populating questions.' });
  }
});
