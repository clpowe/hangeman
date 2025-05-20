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
  score,
  correctLetters,
} = useHangman();

const letter = ref<string>("");
const guess = ref<string>("");

onMounted(() => {
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
//function handlePlayAgain() {
//  letter.value = "";
//  guess.value = "";
//  fetchWord();
//}



const overlay = useOverlay();

const modal = overlay.create(GameOverModal, {
  props: {
    message: "",
  },
});

// Reveal the word
function showWord() {
  gameState.value = "lost";
}

watch(gameState, () => {
  if (gameState.value === "won") {
    modal.open({ message: "You are so smart" });
  }
  if (gameState.value === "lost") {
    modal.open({ message: `Whomp Whomp! The word was ${word.value}` });
  }
});

const remainingGuessesEl = templateRef('remainingGuessesEl')
const scoreEl = templateRef('scoreEl')

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
        <div class="mb-4 flex gap-4">
          <p class="text-2xl font-semibold">
            Score:
            <AnimatedNumber :value="score" class="text-success  font-bold" />

          </p>
          <p class="text-2xl font-semibold">
            Remaining Guesses:
            <AnimatedNumber :value="remainingGuesses" class="text-error  font-bold" />
          </p>
        </div>

        <div class="hint mb-6">
          <p class="text-lg font-semibold">Hint:</p>
          <p>{{ hint }}</p>
        </div>

        <div class="word my-6">
          <div v-for="(char, index) in word" :key="index" class="letter">
            {{ guesses.includes(char) ? char : "" }}
          </div>
        </div>

        <form class="mb-4" @submit.prevent="handleGuessWord">
          <UInput v-model.trim="guess" icon="i-lucide-search" size="xl" placeholder="Guess full word..." />
          <button type="submit" class="mt-2">Guess Word</button>
        </form>

        <div class="guess flex items-center gap-2 mb-4">
          <UInput v-model="letter" maxlength="1" placeholder="Guess letter..." @keydown.enter="handleGuess" />
          <button @click="handleGuess">Guess</button>
        </div>

        <Keyboard />

        <UButton class="mt-4 underline" @click="showWord">Reveal Word</UButton>
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
