<script lang="ts" setup>
const route = useRoute()
const game = ref(route.params.game)
</script>

<template>
  <GamePageHero title="{{ game }}" description="description"></GamePageHero>
</template>

<style></style>