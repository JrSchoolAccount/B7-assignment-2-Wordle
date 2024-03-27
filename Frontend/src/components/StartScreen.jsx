import React, { useState } from 'react';

function StartScreen({ onStartGame }) {
  const [wordLength, setWordLength] = useState(5);
  const [includeDoubleLetters, setIncludeDoubleLetters] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const handleStart = () => {
    onStartGame(wordLength, includeDoubleLetters);
  };

  return (
    <div className="start-screen">
      <h2>Wordle-Clone</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleStart(); }}>
        <div>
          <label htmlFor="wordLength">Select word length:</label>
          <select id="wordLength" value={wordLength} onChange={(e) => setWordLength(parseInt(e.target.value))}>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>
        </div>
        <div>
          <label htmlFor="doubleLetters">Include double letter words:</label>
          <input id="doubleLetters" type="checkbox" checked={includeDoubleLetters} onChange={(e) => setIncludeDoubleLetters(e.target.checked)} />
        </div>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default StartScreen;
