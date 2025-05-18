<script setup lang="ts">
const { resetGame } = useHangman();

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
  <UModal
    :dismissible="false"
    :close="{ onClick: () => emit('close', false) }"
    title="Game over"
  >
    <template #body> {{ message }}|</template>

    <template #footer>
      <UButton @click="handlePlayAgain()">Play Again</UButton> </template
    >:
  </UModal>
</template>
