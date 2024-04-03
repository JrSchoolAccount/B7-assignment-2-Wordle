import express from 'express';
import compareWords from './compareWords.js';

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

app.get('/api/choose-word', (req, res) => {});

app.get('/api/high-score', (req, res) => {});

app.post('/api/high-score', (req, res) => {});

export default app;
