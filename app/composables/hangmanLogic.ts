// composables/hangmanLogic.ts

export function processGuess(
  word: string,
  guesses: string[],
  guess: string,
): {
  updatedGuesses: string[];
  isCorrect: boolean;
} {
  const normalized = guess.toLowerCase();
  if (guesses.includes(normalized)) {
    return { updatedGuesses: guesses, isCorrect: false };
  }
  return {
    updatedGuesses: [...guesses, normalized],
    isCorrect: word.includes(normalized),
  };
}
