<script setup lang="ts">
import GameOverModal from "../layers/ui/components/GameOverModal.vue";

const {
  guessWord,
  remainingGuesses,
  word,
  hint,
  fetchWord,
  guessLetter,
  guesses,
  gameState,
  correct,
  correctLetters,
  usedWords,
} = useHangman();

const letter = ref<string>("");
const guess = ref<string>("");

// Load persisted state
const state = useLocalStorage("used-words", []);

onMounted(() => {
  state.value = usedWords.value;
  correctLetters.value = new Set(word.value?.split(""));
  fetchWord();
});

// Guess single letter
function handleGuess() {
  if (!letter.value.trim()) return;
  guessLetter(letter.value);
  letter.value = "";
}

// Guess full word
function handleGuessWord() {
  if (!guess.value.trim()) return;
  guessWord(guess.value);
  guess.value = "";
}

// Replay the game
function handlePlayAgain() {
  letter.value = "";
  guess.value = "";
  fetchWord();
}

// Reveal the word
function showWord() {
  gameState.value = "lost";
}

const overlay = useOverlay();

const modal = overlay.create(GameOverModal, {
  props: {
    message: "Whomp Whomp! The word was ",
  },
});

watch(gameState, () => {
  if (gameState.value === "won") {
    modal.open({ message: "You are so smart" });
  }
  if (gameState.value === "lost") {
    modal.open({ message: `Whomp Whomp! The word was ${word.value}` });
  }
});

useHead({
  title: "Hangman",
  meta: [{ name: "description", content: "My amazing site." }],
  script: [
    `
    if (localStorage.getItem('vueuse-color-scheme') === "dark" ||
        (!('vueuse-color-scheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('class', "dark")
    } else if (localStorage.getItem('vueuse-color-scheme') === "light") {
      document.documentElement.setAttribute('class', "light")
    }
    `,
  ],
});
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <UHeader :toggle="false">
      <template #title>
        <h1>Hangman</h1>
      </template>
      <template #right>
        <UColorModeSwitch />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <div class="mb-4">
          <p>
            Score: <strong>{{ correct }}</strong>
          </p>
          <p>
            Remaining Guesses: <strong>{{ remainingGuesses }}</strong>
          </p>
        </div>

        <div class="hint mb-6">
          <p class="text-lg font-semibold">Hint:</p>
          <p>{{ hint }}</p>
        </div>

        <div v-if="gameState === 'won'" class="text-green-600 text-xl">
          🎉 Congrats! The word was <strong>{{ word }}</strong
          >!
          <button @click="handlePlayAgain" class="ml-2 underline">
            Play Again
          </button>
        </div>

        <div class="word my-6">
          <div class="letter" v-for="(char, index) in word" :key="index">
            {{ guesses.includes(char) ? char : "" }}
          </div>
        </div>

        <form @submit.prevent="handleGuessWord" class="mb-4">
          <UInput
            icon="i-lucide-search"
            size="xl"
            placeholder="Guess full word..."
            v-model.trim="guess"
          />
          <button type="submit" class="mt-2">Guess Word</button>
        </form>

        <div class="guess flex items-center gap-2 mb-4">
          <UInput
            maxlength="1"
            v-model="letter"
            @keydown.enter="handleGuess"
            placeholder="Guess letter..."
          />
          <button @click="handleGuess">Guess</button>
        </div>

        <Keyboard />
        <button @click="showWord" class="mt-4 underline">Reveal Word</button>
      </UContainer>
    </UMain>
  </UApp>
</template>

<style>
.word {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}
.letter {
  border-bottom: 1px solid var(--stroke-strong);
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.25rem;
  display: grid;
  place-items: center;
}
</style>
