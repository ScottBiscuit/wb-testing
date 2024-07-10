import { jest } from '@jest/globals'

jest.unstable_mockModule('../src/words.js', () => {
    return {
        getWord: jest.fn(() => 'APPLE'),
        isWord: jest.fn(() => true),
    };
});

const { buildLetter, Wordle } = await import("../src/wordle.js");

describe('building a letter object', () => {
    test('returns a letter object', () => {
            // Call buildLetter with two arguments (it doesn’t matter what their values are, but you can use strings for both).
        const letter = buildLetter('A', 'PRESENT');
            // Check that buildLetter returns something equal to { letter: argument1, status: argument2 }.
        expect(letter).toEqual({ letter: 'A', status: 'PRESENT'})
    })
})

describe('constructing a new Wordle game', () => {
    test('Test that it sets maxGuesses to 6 if no argument is passed', () => {
            // Construct a new Wordle instance and check that its maxGuesses property is 6.
        const wordle = new Wordle()
        expect(wordle.maxGuesses).toBe(6)
    })
    test('Test that it sets maxGuesses to the argument passed', () => {
            // Instead of passing zero arguments to the Wordle constructor, pass in 10.
            // Check that the new instance’s maxGuesses property is 10.
        const wordle = new Wordle(10)
        expect(wordle.maxGuesses).toBe(10)
    })
    test('Test that it sets guesses to an array of length maxGuesses', () => {
            // Construct a new Wordle instance.
            // Check that the length of the instance’s guesses array is 6.
        const wordle = new Wordle()
        expect(wordle.guesses.length).toBe(6)
    })
    test('Test that it sets currGuess to 0', () => {
            // Construct a new Wordle instance.
            // Check that the new instance’s currGuess property is 0.
        const wordle = new Wordle()
        expect(wordle.currGuess).toBe(0)
    })
    test('Test that it sets word to a word from getWord', () => {
        // Construct a new Wordle instance.
        // Check the value of its word property is 'APPLE'.
        const wordle = new Wordle()
        expect(wordle.word).toBe('APPLE')
    })
})

describe('building a guess array from a string', () => {
    test('Test that it sets the status of a correct letter to CORRECT', () => {
            // Construct a new Wordle instance.
            // Call buildGuessFromWord and pass in 'A____' (since you mocked isWord to always return true, you don’t need to worry about coming up with a valid word!)
            // Check that the first element of the returned guess has a status of 'CORRECT'
        const wordle = new Wordle()
        const guess = wordle.buildGuessFromWord('A____')
        expect(guess[0].status).toBe('CORRECT')

    })
    test('Test that it sets the status of a present letter to PRESENT', () => {
            // Construct a new Wordle instance.
            // Call buildGuessFromWord and pass in 'E____'.
            // Check that the first element of the returned guess has a status of 'PRESENT'
        const wordle = new Wordle()
        const guess = wordle.buildGuessFromWord('E____')
        expect(guess[0].status).toBe('PRESENT')
    })
    test('Test that it sets the status of an absent letter to ABSENT', () => {
            // Construct a new Wordle instance.
            // Call buildGuessFromWord and pass in 'Z____'.
            // Check that the first element of the returned guess has a status of 'ABSENT'
        const wordle = new Wordle()
        const guess = wordle.buildGuessFromWord('Z____')
        expect(guess[0].status).toBe('ABSENT')
    })
})