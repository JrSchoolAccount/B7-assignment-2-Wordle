import express from 'express';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import ejs from 'ejs';
import * as uuid from 'uuid';

import { HighScore } from './models.js';
import compareWords from './compareWords.js';
import chooseWord from './chooseWord.js';
import correctWord from './correctWord.js';

const GAMES = [];

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/test');

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (req, res) => {
  const html = await fs.readFile('../frontend/dist/index.html');

  res.type('html').send(html);
});

app.get('/high-score', async (req, res) => {
  const highScores = await HighScore.find();

  res.render('layout', { highScores });
});

app.get('/about', async (req, res) => {
  const html = await fs.readFile('./static/about.html');

  res.type('html').send(html);
});

// API Routes

app.post('/api/games', async (req, res) => {
  const wordLength = parseInt(req.query.wordLength);
  const uniqueLetters = req.query.uniqueLetters === 'true';
  const wordList = await fs.readFile('./src/wordList.txt', 'utf8');
  const wordArray = wordList.split('\n').map((word) => word.trim());
  const correctWords = chooseWord(wordArray, wordLength, uniqueLetters);

  if (chooseWord(wordArray, wordLength, uniqueLetters !== 'No word available, try again')) {
    const game = {
      correctWord: correctWords,
      wordLength: wordLength,
      unique: uniqueLetters,
      guesses: [],
      id: uuid.v4(),
      startTime: new Date(),
    };

    GAMES.push(game);
    res.status(201).json({ id: game.id });
  }

  res.status(404);
});

app.post('/api/games/:id/guesses', (req, res) => {
  const game = GAMES.find((savedGame) => savedGame.id == req.params.id);
  if (game) {
    const guess = req.body.guess;
    const compare = compareWords(guess, game.correctWord);
    game.guesses.push(guess);

    const correct = correctWord(compare);

    if (correct && compare.length > 0) {
      game.endTime = new Date();

      res.status(201).json({
        guesses: game.guesses,
        result: game,
        correct: true,
        wordArray: compare,
      });
    } else {
      res.status(201).json({
        guesses: game.guesses,
        correct: false,
        wordArray: compare,
      });
    }
  } else {
    res.status(404).end();
  }
});

app.post('/api/games/:id/high-score', async (req, res) => {
  const game = GAMES.find((savedGame) => savedGame.id === req.params.id);
  if (game) {
    const name = req.body.name;
    const highScore = new HighScore({
      ...game,
      name,
    });
    await highScore.save();

    res.status(201).json(highScore);
  } else {
    res.status(404).json(404).end();
  }
});

app.use('/assets', express.static('../frontend/dist/assets'));
app.use('/static', express.static('./static'));

export default app;
