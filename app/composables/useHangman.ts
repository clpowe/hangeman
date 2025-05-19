import data from "~/assets/words.json";

export const useHangman = () => {
  // Persistent state
  const usedWords = useLocalStorage<string[]>("used-words", []);
  const word = useState<string | undefined>("word", () => undefined);
  const hint = useState<string | undefined>("hint", () => undefined);

  // Gameplay state
  const guesses = useState<string[]>("guesses", () => []);
  const errors = useState<number>("errors", () => 0);
  const correct = useState<number>("correct", () => 0);
  const score = useState<number>("score", () => 0);
  const gameState = useState<"playing" | "won" | "lost">(
    "gameState",
    () => "playing",
  );
  const correctLetters = useState<Set<string>>(
    "correctLetters",
    () => new Set(),
  );

  // Computed
  const remainingGuesses = computed(() => 6 - errors.value);

  // Core word fetch
  const fetchWord = () => {
    const selected = selectWord(data, usedWords.value);
    if (!selected) {
      usedWords.value = [];
      return fetchWord();
    }

    word.value = selected.word.toLowerCase();
    hint.value = selected.definition;
    correctLetters.value = new Set(word.value.split(""));
    usedWords.value.push(word.value);
  };

  // Guess one letter
  const guessLetter = async (input: string) => {
    if (!word.value) return;
    const { updatedGuesses, isCorrect } = processGuess(
      word.value,
      guesses.value,
      input,
    );
    guesses.value = updatedGuesses;

    if (isCorrect) {
      correct.value++;
    } else {
      errors.value++;
    }
    evaluateGameState(score, correct, errors, correctLetters, gameState);
  };

  // Guess entire word
  const guessWord = (guess: string) => {
    if (!word.value) return;
    if (guess.toLowerCase() === word.value) {
      gameState.value = "won";
    } else {
      errors.value++;
    }

    evaluateGameState(score, correct, errors, correctLetters, gameState);
  };

  // Reset full game
  const resetGame = () => {
    resetState(guesses, correct, errors, gameState, fetchWord);
  };

  // Evaluate win/loss

  return {
    fetchWord,
    guessLetter,
    guessWord,
    resetGame,
    remainingGuesses,
    word,
    hint,
    guesses,
    errors,
    correct,
    score,
    usedWords,
    correctLetters,
    gameState,
  };
};
