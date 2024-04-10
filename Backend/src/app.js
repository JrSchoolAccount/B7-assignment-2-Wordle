import express from 'express';
import fs from 'fs/promises';
import compareWords from './compareWords.js';
import chooseWord from './chooseWord.js';
import mongoose from 'mongoose';
import { HighScore } from './models.js';

mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/test');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get('/', (req, res) => {});

app.get('/high-score', (req, res) => {});

app.get('/info', (req, res) => {});

// API Routes

app.post('/api/compare', (req, res) => {
  const { guess, correctWord } = req.body;

  const comparisonResult = compareWords(guess, correctWord);

  res.json({ result: comparisonResult });
});

app.get('/api/choose-word', async (req, res) => {
  const { wordLength, uniqueLetters } = req.query;

  try {
    const wordList = await fs.readFile('./src/wordList.txt', 'utf8');
    const wordArray = wordList.split('\n');

    const word = chooseWord({ wordArray, wordLength: parseInt(wordLength), uniqueLetters: uniqueLetters === 'true' });

    res.json({ word });
  } catch (error) {
    console.error('Error reading word list file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/high-score', async (req, res) => {
  const highScores = await HighScore.find();

  res.json({ highScores });
});

app.post('/api/high-score', (req, res) => {});

export default app;
