<script setup lang="ts">
import type { Team as TeamData } from '~/types/Teams/Team'

withDefaults(defineProps<{
  team: TeamData
  accentColor?: string
}>(), {
  accentColor: 'var(--color-primary-500)'
})
</script>

<template>
  <article
    class="relative h-full overflow-hidden rounded-md border border-neutral-200 bg-white transition-colors hover:border-primary-500 dark:border-neutral-800 dark:bg-neutral-900"
    :style="{ '--team-accent': accentColor }"
  >
    <span class="absolute inset-x-0 top-0 h-1 bg-[var(--team-accent)]" aria-hidden="true" />

    <div class="flex h-full flex-col p-5 sm:p-6">
      <div class="flex items-start gap-4">
        <span class="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400">
          <UIcon name="i-lucide-shield" class="size-6" aria-hidden="true" />
        </span>

        <div class="min-w-0 pt-0.5">
          <p class="text-sm leading-5 text-neutral-600 dark:text-neutral-300">
            {{ team.Association?.Name ?? 'Independent team' }}
          </p>
          <h2 class="mt-1 break-words text-xl font-bold leading-tight text-neutral-950 dark:text-white">
            {{ team.Name }}
          </h2>
        </div>
      </div>

      <dl class="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <div>
          <dt class="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">Split</dt>
          <dd class="mt-1 font-semibold text-neutral-900 dark:text-neutral-100">{{ team.Split }}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">Division</dt>
          <dd class="mt-1 break-words font-semibold text-neutral-900 dark:text-neutral-100">{{ team.Division.Name }}</dd>
        </div>
      </dl>
    </div>
  </article>
</template>