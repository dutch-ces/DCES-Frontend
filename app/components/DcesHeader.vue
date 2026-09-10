<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Games',
    children: [
      { label: 'League of Legends' },
      { label: 'Valorant' },
      { label: 'Counter Strike' },
      { label: 'Rocket League' }
    ]
  },
  {
    label: 'Competition',
    children: [
      {label: 'Standings'},
      {label: 'Schedule'},
      {label: 'Splits'},
      {label: 'Divisions'}
    ]
  },
  {
    label: 'Browse',
    children: [
      {label: 'Teams'},
      {label: 'Players'}
    ]
  },
  {
    label: 'organisation',
    children: [
      {label: 'Board'},
      {label: 'Associations'},
      {label: 'Contact'}
    ]
  }
])
</script>

<template>
  <UHeader
    title="DCES"
    :ui="{
      root: 'bg-primary-100/95 dark:bg-primary-950/95',
      center: 'hidden lg:flex lg:flex-1'
    }"
    class="h-20"
  >
    <template #title>
      <CompetitionLogo class="h-17 w-auto text-primary-500" />
      <h1 class="h-12 w-auto">DCES</h1>
    </template>

    <UNavigationMenu
      :items="items"
      color="primary"
      :ui="{ childLinkLabel: 'whitespace-normal overflow-visible text-clip' }"
      class="w-full justify-center"
    />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        color="primary"
        orientation="vertical"
        :ui="{ childLinkLabel: 'whitespace-normal overflow-visible text-clip' }"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
