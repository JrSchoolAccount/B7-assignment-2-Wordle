import express from 'express';
import fs from 'fs/promises';
import * as uuid from 'uuid';

import compareWords from './compareWords.js';
import chooseWord from './chooseWord.js';
import wordList from './wordList.js';
import correctWord from './correctWord.js';

const GAMES = [];

const app = express();
app.use(express.json());

app.get('/', (req, res) => {});

app.get('/high-score', (req, res) => {});

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

app.get('/api/high-score', (req, res) => {});

app.post('/api/high-score', (req, res) => {});

export default app;
