import { useState } from 'react'
import './App.css'
import InputWord from './components/InputWord';
import WordAnswer from './components/WordAnswer';
import CompareWords from './components/CompareWords';

function App() {
  const [ word, setWord] = useState('')

  function handleGuess(newGuess) {
   setWord(newGuess);
  }

  function handleCompare() {

  }

  return (
    <div className='bg-black min-h-screen text-white'>
      <InputWord onGuessWord={handleGuess} />
      <div className='flex justify-center'>
      <WordAnswer guessedWord={word} />
      </div>
    </div>
  )
}

export default App
