<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const {games, currentGame} = useCurrentGame()



const navbar = computed<NavigationMenuItem[]>(() => [
    ...Object.entries(games).map(([url, game]) => ({
        label: game.name,
        to: `/${url}`,
        icon: game.icon
    })),
    {
        label: 'About',
        children: [
            {label: 'Associations'},
            {label: 'Our Team'},
            {label: 'Contact'}
        ]
    }
])

const options = computed<NavigationMenuItem[]>(() => [
    {label: 'Standings', to: `/${currentGame.value}/standings`},
    {label: 'Schedule', to: `/${currentGame.value}/schedule`},
    {label: 'Splits', to: `/${currentGame.value}/splits`},
    {label: 'Divisions', to: `/${currentGame.value}/divisions`},
    {label: 'Teams', to: `/${currentGame.value}/teams`},
    {label: 'Players', to: `/${currentGame.value}/players`}

])
</script>

<template>
  <UHeader
    title="DCES"
    :ui="{
      root: 'bg-white/95 dark:bg-neutral-950/95',
      center: 'hidden lg:flex lg:flex-1'
    }"
    class="h-20 w-full"
  >
    <template #title>
      <DcesLogo class="h-17 w-auto text-primary-500" />
      <h1 class="h-12 w-auto">DCES</h1>
    </template>
    
    <UNavigationMenu
      :items="navbar"
      color="primary"
      :ui="{ childLinkLabel: 'whitespace-normal overflow-visible text-clip' }"
      class="w-full justify-center"
    />
    

    <template #right>

      <UColorModeButton />
    </template>

  </UHeader>
    <UNavigationMenu v-if="currentGame"
        :items="options"
        color="secondary"
        :ui="{ childLinkLabel: 'whitespace-normal overflow-visible text-clip' }"
        class="w-full justify-center bg-primary-600 " 
    />
    <USeparator />
</template>
