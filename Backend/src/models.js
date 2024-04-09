import mongoose from 'mongoose';

const PlayerScore = mongoose.model('PlayerScore', {
  name: String,
  time: Number,
  guesses: Number,
  wordLength: Number,
  unique: Boolean,
});

export { PlayerScore };
