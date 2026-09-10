<script setup lang="ts">
const route = useRoute()

watch(
  () => route.meta.primaryColor,
  (color) => {
    updateAppConfig({
      ui: {
        colors: {
          primary: (color as string) || 'red'
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

