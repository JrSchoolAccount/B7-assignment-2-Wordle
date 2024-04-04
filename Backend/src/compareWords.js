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

function checkDuplicateLetters(results) {
  results.forEach((item) => {
    if (item.result === 'misplaced') {
      const foundDuplicateLetters = results.filter(
        (result) => result.letter === item.letter && result.result === 'correct'
      );

      if (foundDuplicateLetters.length > 0) {
        item.result = 'incorrect';
      }
    }
  });
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

  checkDuplicateLetters(result);

  return result;
}
