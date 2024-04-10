import mongoose from 'mongoose';

const HighScore = mongoose.model('HighScore', {
  name: String,
  time: Number,
  guesses: Number,
  wordLength: Number,
  unique: Boolean,
});

export { HighScore };
