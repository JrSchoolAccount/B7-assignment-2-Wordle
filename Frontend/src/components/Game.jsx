import React from 'react';

export default function Game({ wordArr }) {

  return (
        <div>
          <ul>
            {wordArr.map((result, index) => (
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
