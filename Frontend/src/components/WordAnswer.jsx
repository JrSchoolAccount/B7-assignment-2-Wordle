import React, { useState, useEffect } from 'react';

export default function WordAnswer({ guessedWord, randomWord }) {
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    const data = {
      guess: guessedWord,
      correctWord: randomWord
    };

    fetch('/api/compare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setGuesses(prevResults => [data.result, ...prevResults]);
    })
    .catch(error => {
      console.error('Error fetching comparison result:', error);
    });
  }, [guessedWord]);

  return (
    <div className="Game">
      <ul>
        {guesses.map((result, index) => (
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
