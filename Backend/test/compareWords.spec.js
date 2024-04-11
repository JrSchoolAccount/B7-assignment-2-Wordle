import { describe, expect, test } from '@jest/globals';
import compareWord from '../src/compareWords.js';

describe('compareWords()', () => {
  /* 
  First i wanted some sort of basic test just to be able to have something to start with.
  So went with the most basic i could think of.
  */
  it('does nothing to an empty string and return an empty array', () => {
    const output = compareWord('', '');
    expect(output).toEqual([]);
  });

  /*
  Then i choose to work on the part of the algorithm that return the result correct.
  I first hard-coded the right output just to se that the test worked, then i fixed it with real logic, so that both tests worked correctly.
  */
  it('compares two strings and returns an array with result: correct', () => {
    const output = compareWord('abc', 'abc');
    expect(output).toEqual([
      { letter: 'a', result: 'correct' },
      { letter: 'b', result: 'correct' },
      { letter: 'c', result: 'correct' },
    ]);
  });

  /*
  After i was done with the previous part of the algorithm i started with the part that checks for incorrect letters. It felt rather straightforward to implement this part to the already existing code.
   */
  it('returns an array of letter objects with "letter" and "result: incorrect"', () => {
    const output = compareWord('abc', 'def');
    expect(output).toEqual([
      { letter: 'a', result: 'incorrect' },
      { letter: 'b', result: 'incorrect' },
      { letter: 'c', result: 'incorrect' },
    ]);
  });

  /*
  The next part to implement was checking if the letter is in the word but at the wrong place and return misplaced. Same process as before, implement the new logic and then fix conflicts with previous tests.
  */
  it('returns an array of letter objects with "letter" and "result: misplaced"', () => {
    const output = compareWord('abc', 'cab');
    expect(output).toEqual([
      { letter: 'a', result: 'misplaced' },
      { letter: 'b', result: 'misplaced' },
      { letter: 'c', result: 'misplaced' },
    ]);
  });

  /*
  At first i added this test just to get full coverage with all the tests, but i incorrectly implemented the test so that i got the incorrect result.
  I went through the code and found that i needed to add a second loop, so that i could get the correct result when i letter shows up more than once and is handled correctly.
 */

  it('compares the word "hallå" with "cykla", then returns an array', () => {
    const output = compareWord('hallå', 'cykla');
    expect(output).toEqual([
      { letter: 'h', result: 'incorrect' },
      { letter: 'a', result: 'misplaced' },
      { letter: 'l', result: 'incorrect' },
      { letter: 'l', result: 'correct' },
      { letter: 'å', result: 'incorrect' },
    ]);
  });

  /*
  After i made all the test and got everything to work as intended, i refactored it to look more neat and reducing the number of lines of code.
  */
});
