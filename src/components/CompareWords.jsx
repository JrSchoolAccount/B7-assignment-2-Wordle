function splitStringToArray(str) {
  return str.split('');
}

function checkLetter(letter, correctWordArray, checkedLetters) {
  const index = correctWordArray.indexOf(letter);
  if (index !== -1 && checkedLetters[index]) {
    checkedLetters[index] = false;

    return 'misplaced';
  }
  return 'incorrect';
}

export default function compareWords(guess, correctWord) {
  const wordArray = splitStringToArray(guess);
  const correctWordArray = splitStringToArray(correctWord);
  const result = [];
  const checkedLetters = new Array(correctWordArray.length).fill(true);

  wordArray.forEach((letter, index) => {
    const correctLetter = correctWordArray[index];
    const resultValue = letter === correctLetter ? 'correct' : checkLetter(letter, correctWordArray, checkedLetters);
    result.push({ letter, result: resultValue });
  });

  return result;
}
