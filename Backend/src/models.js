import mongoose from 'mongoose';

const HighScore = mongoose.model('HighScore', {
  name: String,
  startTime: Date,
  endTime: Date,
  guesses: Array,
  wordLength: Number,
  unique: Boolean,
});

export { HighScore };
