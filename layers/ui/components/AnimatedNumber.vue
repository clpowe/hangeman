<script setup lang="ts">

const props = defineProps<{ value: number | string }>()

let current = props.value
let previous = props.value
const showCurrent = ref(true)

const currentRef = ref<HTMLElement | null>(null)
const previousRef = ref<HTMLElement | null>(null)

watch(
  () => props.value,
  async (oldVal, newVal) => {
    console.log(oldVal, newVal)
    showCurrent.value = false
    const tl = useGSAP().timeline()

    // Animate old value out
    tl.to(previousRef.value, {
      y: -30,
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        showCurrent.value = true
      },
    })
    // Animate new value in
    tl.fromTo(
      currentRef.value,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' }
    )

    previous = props.value
    current = props.value
  }
)
</script>

<template>
  <span class="inline-block relative h-[1em] w-auto">
    <span ref="previousRef" class="absolute left-0 top-0 w-full">
      {{ previous }}
    </span>
    <span ref="currentRef" class="absolute left-0 top-0 w-full">
      {{ current }}
    </span>
  </span>
</template>
