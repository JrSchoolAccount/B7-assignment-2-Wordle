import React, { useState } from 'react';

export default function StartScreen({ onStartGame }) {
  const [wordLength, setWordLength] = useState(5);
  const [includeDoubleLetters, setIncludeDoubleLetters] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    onStartGame(wordLength, includeDoubleLetters);
  };

  return (
    <div className='m-5 w-1/2 md:w-64 mx-auto'>
      <a><img></img></a>
      <form onSubmit={handleStart}>
        <div className='flex items-center'>
          <label className='ms-2 text-xl font-medium text-gray-900 dark:text-gray-300' htmlFor="wordLength">Select word length:</label>
          <select className='text-xl font-medium' id="wordLength" value={wordLength} onChange={(e) => setWordLength(parseInt(e.target.value))}>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>
        </div>
        <div className='flex items-center mb-4'>
          <label className='ms-2 text-xl font-medium text-gray-900 dark:text-gray-300' htmlFor="doubleLetters">Unique:</label>
          <input className='ml-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' id="doubleLetters" type="checkbox" checked={includeDoubleLetters} onChange={(e) => setIncludeDoubleLetters(e.target.checked)} />
        </div>
        <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-2' type="submit">Start Game</button>
      </form>
    </div>
  );
}
