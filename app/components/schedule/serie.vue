<script lang="ts" setup>
import type { ScheduleSerie } from '~/types/schedule'

defineProps<{
  serie: ScheduleSerie
}>()

const dateFormatter = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'short',
  day: 'numeric',
  month: 'short'
})

const timeFormatter = new Intl.DateTimeFormat('nl-NL', {
  hour: '2-digit',
  minute: '2-digit'
})
</script>

<template>
  <UCard :ui="{ body: 'space-y-5 sm:p-5' }">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <time :datetime="serie.time" class="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
        {{ dateFormatter.format(new Date(serie.time)) }} · {{ timeFormatter.format(new Date(serie.time)) }}
      </time>
      <UBadge color="primary" variant="soft">{{ serie.stage }}</UBadge>
    </div>

    <div class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-5">
      <div class="flex min-w-0 items-center gap-3">
        <UAvatar :text="serie.team1.Name.slice(0, 2).toUpperCase()" :alt="serie.team1.Name" size="lg" />
        <div class="min-w-0">
          <p class="truncate font-semibold">{{ serie.team1.Name }}</p>
          <p class="truncate text-xs text-neutral-500">{{ serie.team1.Association?.Name ?? 'Association TBA' }}</p>
        </div>
      </div>

      <span class="text-xs font-bold uppercase text-neutral-400">vs</span>

      <div class="flex min-w-0 items-center justify-end gap-3 text-right">
        <div class="min-w-0">
          <p class="truncate font-semibold">{{ serie.team2.Name }}</p>
          <p class="truncate text-xs text-neutral-500">{{ serie.team2.Association?.Name ?? 'Association TBA' }}</p>
        </div>
        <UAvatar :text="serie.team2.Name.slice(0, 2).toUpperCase()" :alt="serie.team2.Name" size="lg" />
      </div>
    </div>

    <div class="flex gap-2">
      <UBadge color="neutral" variant="outline">Round {{ serie.round }}</UBadge>
      <UBadge color="neutral" variant="outline">Best of {{ serie.best_of }}</UBadge>
    </div>
  </UCard>
</template>