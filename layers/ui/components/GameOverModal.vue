<script setup lang="ts">
const { resetGame, gameState } = useHangman();

defineProps<{
  message: string;
}>();

const emit = defineEmits<{ close: [boolean] }>();

function handlePlayAgain() {
  emit("close", false);
  resetGame();
}
</script>

<template>
  <UModal :dismissible="false" :close="{ onClick: () => emit('close', false) }" title="Game over">
    <template #body> {{ message }}

      <NuxtImg v-if="gameState == 'lost'" src="/loss.webp" />

      <NuxtImg v-else src="/loss.webp" alt="loss" />
    </template>

    <template #footer>
      <UButton @click="handlePlayAgain">Play Again</UButton>
    </template>:
  </UModal>
</template>
