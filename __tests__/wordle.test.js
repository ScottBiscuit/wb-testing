import { jest } from '@jest/globals'

const mockIsWord = jest.fn(() => true)
jest.unstable_mockModule('../src/words.js', () => {
    return {
        getWord: jest.fn(() => 'APPLE'),
        isWord: mockIsWord,
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

describe('making a guess', () => {
    test('Test that it throws an error if no more guesses are allowed', () => {
            // Construct a new Wordle instance. Pass 1 to the constructor so you create a Wordle instance that only accepts one guess.
            // Call appendGuess to make one guess.
            // Calling appendGuess again should throw an error.
        const wordle = new Wordle(1)
        wordle.appendGuess('GUESS')
        expect(() => wordle.appendGuess('GUESS')).toThrow();
    })
    test('Test that it throws an error if the guess is not of length 5', () => {
            // Construct a new Wordle instance.
            // Calling appendGuess with a string more than five characters long should throw an error.
        const wordle = new Wordle()
        expect(() => wordle.appendGuess('GUESSES')).toThrow();
    })
    test('Test that it throws an error if the guess is not a word', () => {
            // Construct a new Wordle instance.
            // Change the return value of mockIsWord to false.
            // Calling appendGuess with any five-character string (like 'GUESS') should throw an error.
        const wordle = new Wordle()
        mockIsWord.mockReturnValueOnce(false)
        expect(() => wordle.appendGuess('GUESS')).toThrow()
    })
    test('Test that it increments the current guess', () => {
            // Construct a new Wordle instance.
            // Call appendGuess.
            // Check that the instance’s currGuess property is 1.
        const wordle = new Wordle()
        wordle.appendGuess('GUESS')
        expect(wordle.currGuess).toBe(1)
    })
})

describe('checking if the Wordle has been solved', () => {
    test('returns true if the latest guess is the correct word', () => {
        const wordle = new Wordle()
        wordle.appendGuess('APPLE')
        expect(wordle.isSolved()).toBe(true)
    })
    test('returns false if the latest guess is not the correct word', () => {
        const wordle = new Wordle()
        wordle.appendGuess('GUESS')
        expect(wordle.isSolved()).toBe(false)
    })
})

describe('checking if the game should end', () => {
    test('returns true if the latest guess is the correct word', () => {
        const wordle = new Wordle()
        wordle.appendGuess('APPLE')
        expect(wordle.shouldEndGame()).toBe(true)
    })
    test('returns true if there are no more guesses left', () => {
        const wordle = new Wordle(1)
        wordle.appendGuess('GUESS')
        expect(wordle.shouldEndGame()).toBe(true)
    })
    test('returns false if no guess has been made', () => {
        const wordle = new Wordle()
        expect(wordle.shouldEndGame()).toBe(false)
    })
    test('returns false if there are guesses left and the word has not been guessed', () => {
        const wordle = new Wordle()
        wordle.appendGuess('GUESS')
        expect(wordle.shouldEndGame()).toBe(false)
    })
})