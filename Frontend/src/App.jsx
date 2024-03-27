import { useState } from 'react'
import './App.css'
import InputWord from './components/InputWord';
import WordAnswer from './components/WordAnswer';
import StartScreen from './components/StartScreen';

function App() {
  const [ word, setWord ] = useState('');
  const [ gameStarted, setGameStarted ] = useState(false);
  const [ includeDoubleLetters, setDoubleLetters ] = useState(false);
  const [selectedWord, setSelectedWord ] = useState('');

  function handleGuess(newGuess) {
   setWord(newGuess);
  }

  const handleStartGame = (length, doubleLetters, name) => {
    setWordLength(length);
    setIncludeDoubleLetters(doubleLetters);
    const word = chooseWord(wordList, length, doubleLetters);
    setSelectedWord(word);
    setGameStarted(true);
  };

  const wordList = ['apple', 'banana', 'orange', 'grape', 'pear'];

  return (
    <div className='bg-black min-h-screen text-white'>
      {!gameStarted ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <>
        <ChooseWord
        wordList={wordLength}
        uniqueLetters={includeDoubleLetters}
         />
      <InputWord onGuessWord={handleGuess} />
      <div className='flex justify-center'>
      <WordAnswer guessedWord={word} />
      </div>
      </>
      )}
    </div>
  );
}

export default App
