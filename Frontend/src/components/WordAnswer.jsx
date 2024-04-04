import React, { useState, useEffect } from 'react';

export default function WordAnswer({ guessedWord, randomWord }) {
  const [comparisonResult, setComparisonResult] = useState([]);

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

        setComparisonResult(data.result);
      })
      .catch(error => {
        console.error('Error fetching comparison result:', error);
      });
  }, [guessedWord]);

  const resultElements = comparisonResult.map((item, index) => (
    <span
      key={index}
      className={`m-0.5 border p-2 flex items-center justify-center w-10 h-10 bg-gray-200 text-black ${item.result}`}
    >
      {item.letter.toUpperCase()}
    </span>
  ));

  return <div className="flex flex-row">{resultElements}</div>;
}
