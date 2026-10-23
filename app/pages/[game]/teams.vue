<script lang="ts" setup>
import { computed, ref } from 'vue'
import { createFakeTeams, TeamsSchema, type Teams, type Team } from '~/types/Teams/Team';

const request = createFakeTeams(140)
const teams: Teams = TeamsSchema.parse(request) //will error if the api is broken
const searchQuery = ref('')
const selectedDivision = ref('All divisions')

const divisionOptions = computed(() => [
    'All divisions',
    ...new Set(teams.map(team => team.Division.Name).sort((a, b) => a.localeCompare(b)))
])

const filteredTeams = computed(() => {
    const query = searchQuery.value.trim().toLocaleLowerCase()

    return teams.filter((team: Team) => {
        const matchesDivision = selectedDivision.value === 'All divisions'
            || team.Division.Name === selectedDivision.value
        const searchableText = [team.Name, team.Association?.Name, team.Split, team.Division.Name]
            .filter(Boolean)
            .join(' ')
            .toLocaleLowerCase()

        return matchesDivision && (!query || searchableText.includes(query))
    })
})
</script>

<template>
    <main>
        <GamePageHero title="Meet the teams"
            description="Get to know the teams competing this split, from their divisions to the associations behind them.">
            <template #aside>
                <div class="flex items-center gap-3 border-l-2 border-primary pl-4 md:mb-1">
                    <span class="text-4xl font-bold tabular-nums text-neutral-950 dark:text-white">{{ teams.length
                    }}</span>
                    <span class="max-w-20 text-sm font-medium leading-5 text-neutral-600 dark:text-neutral-300">
                        teams in the league
                    </span>
                </div>
            </template>
        </GamePageHero>

        <section class="py-9 md:py-12" aria-labelledby="teams-heading">
            <UContainer>
                <div
                    class="flex flex-col gap-5 border-b border-neutral-200 pb-5 dark:border-neutral-800 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p class="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Team directory</p>
                        <h2 id="teams-heading" class="mt-2 text-2xl font-bold text-neutral-950 dark:text-white">All
                            teams</h2>
                    </div>

                    <div class="grid gap-3 sm:grid-cols-[minmax(14rem,22rem)_12rem]">
                        <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Search teams, associations..."
                            aria-label="Search teams" />
                        <USelect v-model="selectedDivision" :items="divisionOptions" aria-label="Filter by division" />
                    </div>
                </div>

                <p class="py-4 text-sm text-neutral-600 dark:text-neutral-400" aria-live="polite">
                    Showing <span class="font-semibold text-neutral-900 dark:text-neutral-100">{{ filteredTeams.length
                    }}</span>
                    of {{ teams.length }} teams
                </p>

                <div v-if="filteredTeams.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <Team v-for="team in filteredTeams" :key="team.Id" :team="team" />
                </div>

                <div v-else class="border-y border-neutral-200 py-16 text-center dark:border-neutral-800">
                    <UIcon name="i-lucide-search-x" class="size-8 text-neutral-400" aria-hidden="true" />
                    <h3 class="mt-3 text-lg font-semibold text-neutral-950 dark:text-white">No teams found</h3>
                    <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Try another search or choose a
                        different division.</p>
                    <UButton class="mt-4" color="neutral" variant="outline"
                        @click="searchQuery = ''; selectedDivision = 'All divisions'">
                        Clear filters
                    </UButton>
                </div>
            </UContainer>
        </section>
    </main>
</template>