import fs from 'fs';

export default async function wordList() {
  try {
    const data = await fs.promises.readFile('./src/wordList.txt', 'utf8');
    const wordArray = data.split('\r\n');

    return wordArray;
  } catch (e) {
    console.error(e);
    return [];
  }
}
