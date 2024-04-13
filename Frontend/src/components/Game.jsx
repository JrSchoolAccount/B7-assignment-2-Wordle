import React, { useState, useEffect } from 'react';

export default function Game({ guessedWord , gameId, setGuesses, onCorrectGuess }) {
  const [ wordArray, setWordArray ] = useState([]);

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
        const result = data.result;

        onCorrectGuess(result);
        setWordArray([]);
      }
    };
    
    fetchData();
  }, [guessedWord]);

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
}
