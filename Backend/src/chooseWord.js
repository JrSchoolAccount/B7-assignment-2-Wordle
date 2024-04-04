function filterWordsByLength(array, length) {
  return array.filter((word) => word.length === length);
}

function filterWordsByUniqueLetters(array, uniqueLetters) {
  if (uniqueLetters) {
    return array.filter(hasUniqueLetters);
  } else {
    return array;
  }
}

function hasUniqueLetters(word) {
  const seen = {};

  for (let letter of word) {
    if (seen[letter]) return false;
    seen[letter] = true;
  }

  return true;
}

function wordRandomizer(array) {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}

export default function chooseWord({ wordArray, wordLength, uniqueLetters }) {
  const filteredByLength = filterWordsByLength(wordArray, wordLength);

  const filteredByUniqueLetters = filterWordsByUniqueLetters(filteredByLength, uniqueLetters);

  const randomWord = wordRandomizer(filteredByUniqueLetters);

  return randomWord || 'No word available, try again';
}
