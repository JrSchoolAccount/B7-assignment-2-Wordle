import express from 'express';
import fs from 'fs/promises';
import compareWords from './compareWords.js';
import chooseWord from './chooseWord.js';

const app = express();
app.use(express.json());

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

app.get('/api/high-score', (req, res) => {});

app.post('/api/high-score', (req, res) => {});

export default app;
