import express from 'express';
import fs from 'fs-promises';
import compareWords from './compareWords';

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

app.get('/api/high-score', (req, res) => {});

app.post('/api/high-score', (req, res) => {});
