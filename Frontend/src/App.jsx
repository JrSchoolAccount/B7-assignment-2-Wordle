import { useState } from 'react'
import './App.css'
import InputWord from './components/InputWord';
import WordAnswer from './components/WordAnswer';
import StartScreen from './components/StartScreen';

function App() {
  const [ word, setWord ] = useState('');
  const [ gameStarted, setGameStarted ] = useState(false);
  const [ includeDoubleLetters, setDoubleLetters ] = useState(false);
  const [wordLength, setWordLength] = useState(5);

  function handleGuess(newGuess) {
   setWord(newGuess);
  }

  const handleStartGame = (length, doubleLetters) => {
    setWordLength(length);
    setDoubleLetters(doubleLetters);
    setGameStarted(true);
  };

  return (
    <div className='bg-black min-h-screen text-white'>
      {!gameStarted ? (
        <StartScreen
        onStartGame={handleStartGame}
        setWordLength={setWordLength} />
      ) : (
        <>
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
