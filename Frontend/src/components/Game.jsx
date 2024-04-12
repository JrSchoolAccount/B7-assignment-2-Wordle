import React, { useState, useEffect } from 'react';

export default function Game({ guessedWord , gameId, onCorrectGuess }) {
  const [ playingState, setPlayingState ] = useState(true);
  const [ guesses, setGuesses ] = useState([]);
  const [ wordArray, setWordArray ] = useState([]);
  const [ name, setName ] = useState('');
  const [result, setResult] = useState(null);
  
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

    onCorrectGuess();
  };

  useEffect( () => {
    const fetchData = async () => {
      const res = await fetch(`/api/games/${gameId}/guesses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({guess: guessedWord})
      });

      const data = await res.json();
      
      setWordArray(prevGuess => [data.wordArray, ...prevGuess]);
      setGuesses(data.guesses);
      
      if (data.guesses.length > 0 && data.correct){

        setResult(data.result)
        setPlayingState(false);
      }
    };
    
    fetchData();
  }, [guessedWord]);

if(playingState) {
  return (    
      <div>
        <ul>
          {wordArray.map((result, index) => (
            <li key={index}>
              <div className="flex flex-row">
                {result.map((item, i) => (
                  <span
                    key={i}
                    className={`m-0.5 border p-2 flex items-center justify-center w-10 h-10 bg-gray-200 text-black ${item.result}`}
                  >
                    {item.letter.toUpperCase()}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    const time = (new Date(result.endTime) - new Date(result.startTime)) / 1000;
    return (
      <div>
        <h1>You won!</h1>
        <p>The correct word: {guesses.at(-1)} </p>
        <p>Guesses: {guesses.length}</p>
        <p>Time: {time}s</p>
        <h2>Add to High-Score</h2>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(ev) => setName(ev.target.value)} placeholder='Your name' />
          <input type='submit' />
        </form>
      </div>
    );
  }
}
