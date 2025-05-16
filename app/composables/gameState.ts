// composables/gameState.ts

export function resetGame(
  guesses: Ref<string[]>,
  correct: Ref<number>,
  errors: Ref<number>,
  gameState: Ref<"playing" | "won" | "lost">,
  fetchWord: () => void,
) {
  guesses.value = [];
  correct.value = 0;
  errors.value = 0;
  gameState.value = "playing";
  fetchWord();
}

export function evaluateGameState(
  correct: Ref<number>,
  errors: Ref<number>,
  correctLetters: Ref<Set<string>>,
  gameState: Ref<"playing" | "won" | "lost">,
) {
  if (correct.value === correctLetters.value.size) {
    gameState.value = "won";
  }
  if (errors.value >= 6) {
    gameState.value = "lost";
  }
}
