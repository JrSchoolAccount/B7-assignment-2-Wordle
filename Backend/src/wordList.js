import fs from 'fs';

export default function wordList() {
  try {
    const data = fs.readFile('./src/wordList.txt', 'utf8');
    const wordArray = data.split('\r\n');

    return wordArray;
  } catch (e) {
    console.error(e);
    return [];
  }
}
