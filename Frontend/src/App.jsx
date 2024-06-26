import { useState } from 'react'
import './App.css'
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import Input from './components/Input';
import Navbar from './components/Navbar';
import Logo from './components/Logo';

function App() {
  const [ gameId, setGameId ] = useState(null);
  const [ gameState, setGameState ] = useState('notPlaying');
  const [ guesses, setGuesses ] = useState([]);
  const [ includeDoubleLetters, setIncludeDoubleLetters ] = useState(false);
  const [ name, setName ] = useState('')
  const [ result, setResult ] = useState(null)
  const [ word, setWord ] = useState('');
  const [ wordArr, setWordArr ] = useState([]);
  const [ wordLength, setWordLength ] = useState(5);

  const handleInput = async (word) => {
  setWord(word);
  
    const res = await fetch(`/api/games/${gameId}/guesses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({guess: word})
    });

    const data = await res.json();
    
    setWordArr(prevGuess => [data.wordArray, ...prevGuess]);
    setGuesses(data.guesses);
    
    if (data.guesses.length > 0 && data.correct){
      const wordResult = data.result;

      handleGameWon(wordResult);
    }

  };
  
  const handleStartGame = async () => {    


    try {
      const res = await fetch(`/api/games?wordLength=${wordLength}&uniqueLetters=${includeDoubleLetters}`, {
        method: "post",
      });
      if (res === 404){
        alert('No word available, please try again')
      } else {
      const data = await res.json();
      setGameId(data.id);
      
      setGameState('playing');
      }
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
  };

const handleGameWon = (result) => {
    setResult(result);
    setGuesses([]);
    setWordArr([]);
    setGameState('won');
};

  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <Logo />
      {gameState === 'notPlaying' ? (
        <StartScreen
          onStartGame={handleStartGame}
          wordLength={wordLength}
          includeDoubleLetters={includeDoubleLetters}
          setWordLength={setWordLength}
          setIncludeDoubleLetters={setIncludeDoubleLetters} />
      ) : (
        <>
          {gameState === 'playing' && (
            <>
            <Input wordLength={wordLength} onSubmitInput={handleInput} />
            {word !== '' && (
              <div className='flex justify-center'>
                <Game wordArr={wordArr} />
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
