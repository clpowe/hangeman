// composables/guessLogic.ts
export function processGuess(
  targetWord: string,
  currentGuesses: string[],
  newLetter: string,
): { updatedGuesses: string[]; isCorrect: boolean } {
  const guess = newLetter.toLowerCase();
  if (currentGuesses.includes(guess))
    return { updatedGuesses: currentGuesses, isCorrect: false };
  return {
    updatedGuesses: [...currentGuesses, guess],
    isCorrect: targetWord.includes(guess),
  };
}
