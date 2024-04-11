import { useState } from 'react'
import './App.css'
import InputWord from './components/InputWord';
import WordAnswer from './components/WordAnswer';
import StartScreen from './components/StartScreen';

function App() {
  const [ word, setWord ] = useState('');
  const [ includeDoubleLetters, setDoubleLetters ] = useState(false);
  const [ wordLength, setWordLength ] = useState(5);
  const [ gameState, setGameState ] = useState('');
  const [ gameId, setGameId ] = useState(null);

  function handleGuess(newGuess) {
  setWord(newGuess);
  }

  const handleStartGame = async (length, doubleLetters) => {
    setWordLength(length);
    setDoubleLetters(doubleLetters);

    try {
      const res = await fetch(`/api/games?wordLength=${length}&uniqueLetters=${doubleLetters}`, {
        method: "post",
      });
      const data = await res.json();
      setGameId(data.id);
      
      setGameState('playing');

    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

const handleGameWon = () => {
    setGameState('won');
};

  return (
    <div className='bg-black min-h-screen text-white'>
      {gameState === '' ? (
        <StartScreen
        onStartGame={handleStartGame}
        setWordLength={setWordLength} />
      ) : (
        <>
          {gameState === 'playing' && (
            <>
              <InputWord onGuessWord={handleGuess} wordLength={wordLength} />
              <div className='flex justify-center'>
                <WordAnswer guessedWord={word} gameId={gameId} onCorrectGuess={handleGameWon} />
              </div>
            </>
          )}
          {gameState === 'won' && (
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
