import React, { useState, useEffect } from 'react';
import compareWords from './CompareWords';

export default function WordAnswer({ guessedWord }) {
  const [comparisonResult, setComparisonResult] = useState([]);

  useEffect(() => {
    
    const result = compareWords(guessedWord, 'cykla');

    setComparisonResult(result);
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
