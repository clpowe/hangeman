// composables/hangmanLogic.ts
import type { WORD } from "../../types";

export function selectWord(data: WORD[], usedWords: string[]): WORD | null {
  const available = data.filter(({ word }) => !usedWords.includes(word));
  if (!available.length) return null;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex] ?? null;
}

export function processGuess(
  word: string,
  guesses: string[],
  guess: string,
): {
  updatedGuesses: string[];
  isCorrect: boolean;
} {
  const normalized = guess.toLowerCase();
  if (guesses.includes(normalized))
    return { updatedGuesses: guesses, isCorrect: false };
  return {
    updatedGuesses: [...guesses, normalized],
    isCorrect: word.includes(normalized),
  };
}
