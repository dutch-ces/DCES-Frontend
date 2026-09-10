<script setup lang="ts">
const route = useRoute()

watch(
  () => route.meta.primaryColor,
  (color) => {
    updateAppConfig({
      ui: {
        colors: {
          primary: (color as string) || 'green'
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
    </NuxtLayout>
  </UApp>
</template>

