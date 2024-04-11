import express from 'express';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import ejs from 'ejs';
import * as uuid from 'uuid';

import { HighScore } from './models.js';
import compareWords from './compareWords.js';
import chooseWord from './chooseWord.js';
import wordList from './wordList.js';
import correctWord from './correctWord.js';

const GAMES = [];

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

app.post('/api/games', async (req, res) => {
  const { wordLength, uniqueLetters } = req.query;
  const words = await wordList();

  const game = {
    correctWord: chooseWord({ words, wordLength: parseInt(wordLength), uniqueLetters: uniqueLetters === 'true' }),
    guesses: [],
    id: uuid.v4(),
    startTime: new Date(),
  };

  GAMES.push(game);

  res.status(201).json({ id: game.id });
});

app.post('/api/games/:id/guesses', (req, res) => {
  const game = GAMES.find((savedGame) => savedGame.id == req.params.id);
  if (game) {
    const guess = req.body.guess;
    game.guesses.push(guess);

    const compare = compareWords(guess, game.correctWord);

    const correct = correctWord(compare);

    if (correct) {
      game.endTime = new Date();

      res.status(201).json({
        guesses: game.guesses,
        result,
        game,
        correct: true,
      });
    } else {
      res.status(201).json({
        guesses: game.guesses,
        correct: false,
      });
    }
  } else {
    res.status(404).end();
  }
});

app.get('/api/high-score', async (req, res) => {
  const highScores = await HighScore.find();

  res.json({ highScores });
});

app.post('/api/high-score', (req, res) => {});

app.use('/assets', express.static('../frontend/dist/assets'));

export default app;
