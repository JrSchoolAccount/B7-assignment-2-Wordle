import { useState } from 'react'
import './App.css'
import Input from './components/Input';
import Game from './components/Game';
import StartScreen from './components/StartScreen';

function App() {
  const [ word, setWord ] = useState('');
  const [ includeDoubleLetters, setDoubleLetters ] = useState(false);
  const [ wordLength, setWordLength ] = useState(5);
  const [ gameState, setGameState ] = useState('notPlaying');
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

const handleGameOver = () => {
    setGameState('notPlaying');
};

  return (
    <div className='bg-black min-h-screen text-white'>
      {gameState === 'notPlaying' ? (
        <StartScreen
        onStartGame={handleStartGame}
        setWordLength={setWordLength} />
      ) : (
        <>
          {gameState === 'playing' && (
            <>
              <Input onGuessWord={handleGuess} wordLength={wordLength} />
              <div className='flex justify-center'>
                <Game guessedWord={word} gameId={gameId} onCorrectGuess={handleGameOver} />
              </div>
            </>
          )}
          
        </>
      )}
    </div>
  );
}

export default App
