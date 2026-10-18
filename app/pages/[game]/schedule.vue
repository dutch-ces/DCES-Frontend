<script lang="ts" setup>
import { createFakeSchedule, ScheduleSchema } from '~/types/schedule';
const request = createFakeSchedule()
const schedule = ScheduleSchema.parse(request).sort(
  (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
)
const { currentGameData } = useCurrentGame()
</script>

<template>
  <main>
    <section class="bg-neutral-950 text-white">
      <UContainer class="py-14 md:py-20">
        <div class="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
          <UIcon :name="currentGameData?.icon ?? 'i-lucide-gamepad-2'" class="size-5" />
          {{ currentGameData?.name ?? 'Competition' }}
        </div>
        <h1 class="mt-5 text-4xl font-bold sm:text-6xl">Match schedule</h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-neutral-300">
          Browse the upcoming series and find out who plays next.
        </p>
      </UContainer>
    </section>

    <section class="py-10 md:py-14" aria-labelledby="schedule-heading">
      <UContainer>
        <div
          class="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-800">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{{ currentGameData?.name }}</p>
            <h2 id="schedule-heading" class="mt-2 text-2xl font-bold text-neutral-950 dark:text-white">
              Series
            </h2>
          </div>
        </div>

        <div v-if="schedule.length" class="divide-y divide-neutral-200 dark:divide-neutral-800">
          <ScheduleSerie v-for="(serie, index) in schedule" :key="`${serie.team1.Id}-${serie.team2.Id}-${index}`"
            :serie="serie" />
        </div>
        <p v-else class="py-16 text-center text-neutral-600 dark:text-neutral-300">
          No matches have been scheduled yet.
        </p>
      </UContainer>
    </section>
  </main>
</template>