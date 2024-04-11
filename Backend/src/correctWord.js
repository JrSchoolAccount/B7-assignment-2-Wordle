export default function correctWord(guess) {
  if (guess.every((item) => item.result === 'correct')) {
    return true;
  }

  return false;
}
