// composables/wordManager.ts
import type { WORD } from "../../types";

export function selectWord(data: WORD[], usedWords: string[]): WORD | null {
  const available = data.filter(({ word }) => !usedWords.includes(word));
  if (!available.length) return null;
  const random = available[Math.floor(Math.random() * available.length)];
  return random ?? null;
}
