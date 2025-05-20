<script setup lang="ts">


const props = defineProps<{
  value: number | string
}>()

const displayed = ref(props.value)
const numberRef = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline

watch(
  () => props.value,
  async (newVal) => {
    await nextTick()

    if (!numberRef.value) return
    if (tl) tl.kill()

    tl = useGSAP().timeline()

    // Animate old value out
    tl.to(numberRef.value, {
      y: -30,
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        displayed.value = newVal
      },
    })

    // Animate new value in
    tl.fromTo(
      numberRef.value,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' }
    )
  }
)
</script>

<template>
  <span ref="numberRef" class="inline-block">
    {{ displayed }}
  </span>
</template>
