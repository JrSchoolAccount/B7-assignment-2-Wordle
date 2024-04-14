import { useState } from 'react'
import './App.css'
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import Input from './components/Input';
import Navbar from './components/Navbar';

function App() {
  const [ gameId, setGameId ] = useState(null);
  const [ gameState, setGameState ] = useState('notPlaying');
  const [ guesses, setGuesses ] = useState([]);
  const [ includeDoubleLetters, setDoubleLetters ] = useState(false);
  const [ name, setName ] = useState('')
  const [ result, setResult ] = useState(null)
  const [ word, setWord ] = useState('');
  const [ wordLength, setWordLength ] = useState(5);

  function handleInput(text) {
  setWord(text);
  }

  const handleStartGame = async (length, doubleLetters) => {    
    setWordLength(length);
    setDoubleLetters(doubleLetters);

    try {
      const res = await fetch(`/api/games?wordLength=${wordLength}&uniqueLetters=${includeDoubleLetters}`, {
        method: "post",
      });
      const data = await res.json();
      setGameId(data.id);
      
      setGameState('playing');

    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const highscore = {
      name,
    };

    await fetch(`http://localhost:5080/api/games/${gameId}/high-score`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highscore),
    });

    setGameState('notPlaying');
    setGuesses([]);
  };

const handleGameWon = (result, guesses) => {
    setResult(result);
    setGameState('won');
};

  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar/>
      {gameState === 'notPlaying' ? (
        <StartScreen
        onStartGame={handleStartGame}
        setWordLength={setWordLength} />
      ) : (
        <>
          {gameState === 'playing' && (
            <>
            <Input wordLength={wordLength} onSubmitInput={handleInput} />
            {word !== '' && (
              <div className='flex justify-center'>
                <Game
                  gameId={gameId}
                  guessedWord={word}
                  setGuesses={setGuesses}
                  
                  onCorrectGuess={handleGameWon}
                />
              </div>
            )}
          </>
        )}
        {gameState === 'won' && (
          <div className='flex-col items-center m-5 w-1/2 md:w-64 mx-auto'>
          <h1 className='text-center text-4xl font-bold mb-2'>You won!</h1>
              <p className='text-center text-xl'>Correct word: {guesses.at(-1)}</p>
              <p className='text-center text-xl'>Guesses: {guesses.length}</p>
              <p className='text-center text-xl'>Time: {(new Date(result.endTime) - new Date(result.startTime)) / 1000}s</p>
              <h2 className='text-center text-2xl mt-10 mb-2'>Add to High-Score</h2>
              <form onSubmit={handleSubmit}>
                <input className='w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-2' type='text' value={name} onChange={(ev) => setName(ev.target.value)} placeholder='Your name' />
                <input className='w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-2' type='submit' />
              </form>
          </div>
        )}
      </>
    )}
  </div>
);
}

export default App
