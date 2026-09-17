<script setup lang="ts">
const {currentGameData} = useCurrentGame()

watch(
  () => currentGameData.value?.color,
  (color) => {
    updateAppConfig({
      ui: {
        colors: {
          primary: color || 'dcesorange'
        }
      }
    })
  },
  { immediate: true }
)
</script>

<template>
  <NuxtRouteAnnouncer />
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

