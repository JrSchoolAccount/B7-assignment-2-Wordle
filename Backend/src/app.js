import express from 'express';
import fs from 'fs/promises';
import compareWords from './compareWords.js';
import chooseWord from './chooseWord.js';
import mongoose from 'mongoose';
import ejs from 'ejs';
import { HighScore } from './models.js';

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/test');

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get('/', async (req, res) => {
  const html = await fs.readFile('../frontend/dist/index.html');

  res.type('html').send(html);
});

app.get('/high-score', async (req, res) => {
  const highScores = await HighScore.find();

  res.render('layout', { highScores });
});

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
    const wordArray = wordList.split('\r\n');

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

app.use('/assets', express.static('../frontend/dist/assets'));

export default app;
