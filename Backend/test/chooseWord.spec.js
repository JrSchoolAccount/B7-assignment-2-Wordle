import { describe, expect, test } from '@jest/globals';
import chooseWord from '../src/chooseWord.js';

describe('chooseWord()', () => {
  /* 
    First i made a basic test just to have a starting point and to handle when no parameters where included. Im not sure i think this functionally even should exist, but still its nice to have something to handle these cases. Also i needed a starting point, don't know why this was so hard to come up with, it was almost as hard as coming up with names.
  */
  it('Takes an empty array and outputs string "No word available, try again"', () => {
    const output = chooseWord([], '', '');

    expect(output).toEqual('No word available, try again');
  });

  /*
    Then i moved on to making logic that filters and array of words by length and returns the with the correct length.
  */
  it('returns a word from an array with with six letters', () => {
    const wordArray = ['dog', 'bird', 'rabbit'];
    const wordLength = 6;
    const output = chooseWord(wordArray, wordLength, '');

    expect(output).toEqual('rabbit');
  });

  /*
    After that i worked on the logic to check i the word was unique(If it contains two or more of the same letters). And i also implemented the logic to return 'No word available, try again' if the criteria was not met.
  */
  it('filters out 6 letter words with letters that are not unique and returns string "No word available, try again"', () => {
    const wordArray = ['gibbon', 'rabbit'];
    const wordLength = 6;
    const uniqueLetters = true;
    const output = chooseWord(wordArray, wordLength, uniqueLetters);

    expect(output).toEqual('No word available, try again');
  });

  /*
    In this part i wanted to check it the functionality worked when the criteria was met and the word was not unique.
  */
  it('returns a 6 letter word that is not unique (has the same letter more than once)', () => {
    const wordArray = ['cat', 'tiger', 'rabbit'];
    const wordLength = 6;
    const uniqueLetters = false;
    const output = chooseWord(wordArray, wordLength, uniqueLetters);

    expect(output).toEqual('rabbit');
  });

  /*
    Then i moved on to test and implemented the logic for when the word was supposed to be unique.
  */
  it('returns a 6 letter word that is unique (only uses the same letter once)', () => {
    const wordArray = ['lizard', 'gibbon', 'rabbit'];
    const wordLength = 6;
    const uniqueLetters = true;
    const output = chooseWord(wordArray, wordLength, uniqueLetters);

    expect(output).toEqual('lizard');
  });

  /*
    After i could se that all my test covered all the things i wanted to test and all the code. I made small changes to some of the tests to check that the randomness worked as intended, by running the tests several times.
    With this done i was satisfied that i hade full coverage.
  */
});
