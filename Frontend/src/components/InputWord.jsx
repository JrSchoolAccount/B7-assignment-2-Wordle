import { useState } from 'react'

export default function InputWord({ onGuessWord, wordLength }) {
    const [text, setText] = useState('');
    return (
    <div className='m-5 w-1/2 md:w-64 mx-auto '>
        <form onSubmit={(ev) => {
            ev.preventDefault();
            
            onGuessWord(text);
        }}>
      <input
      minLength={wordLength}
      maxLength={wordLength}
      type='text'
      value={text}
      id='wordInput'
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      autoFocus
      pattern="[a-z]*"
      onChange={(ev) => setText(ev.target.value)}/>
      </form>
    </div>
    )
}