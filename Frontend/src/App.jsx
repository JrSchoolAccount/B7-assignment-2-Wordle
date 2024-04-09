import { useState } from 'react'
import './App.css'
import InputWord from './components/InputWord';
import WordAnswer from './components/WordAnswer';
import StartScreen from './components/StartScreen';

function App() {
  const [ word, setWord ] = useState('');
  const [ gameStarted, setGameStarted ] = useState(false);
  const [ includeDoubleLetters, setDoubleLetters ] = useState(false);
  const [ wordLength, setWordLength ] = useState(5);
  const [ randomWord, setRandomWord ] = useState('');
  const [ guesses, setGuesses ] = useState([]);
  const [ gameOver, setGameOver ] = useState(false);
  const [ correctGuess, setCorrectGuess ] = useState(false);

  function handleGuess(newGuess) {
   setWord(newGuess);
  }

  const handleStartGame = (length, doubleLetters) => {
    setWordLength(length);
    setDoubleLetters(doubleLetters);

    fetch(`/api/choose-word?wordLength=${length}&uniqueLetters=${doubleLetters}`).then(response => response.json()).then(data => {

    setRandomWord(data.word);

    setGameStarted(true);
  })
  .catch(error => {
    console.error('Error fetching random word:', error);
  });

  
};

  return (
    <div className='bg-black min-h-screen text-white'>
      {!gameStarted ? (
        <StartScreen
        onStartGame={handleStartGame}
        setWordLength={setWordLength} />
      ) : (
        <>
          {!gameOver && (
            <>
              <InputWord onGuessWord={handleGuess} wordLength={wordLength} />
              <div className='flex justify-center'>
                <WordAnswer guessedWord={word} randomWord={randomWord} setCorrectGuess={setCorrectGuess} />
              </div>
            </>
          )}
          {gameOver && (
            <div className='Game'>
              <h1>You won!</h1>
              <p>The correct word was </p>
              <p>Guesses: </p>
              <p>Duration: </p>
              <h2>Add to highscore</h2>
              <form>
                <input placeholder='Your name' />
                <input type='submit' />
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App
