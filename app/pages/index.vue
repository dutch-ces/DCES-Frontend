<script setup lang="ts">
const { games: gameCatalog } = useCurrentGame()
const games = Object.entries(gameCatalog).map(([slug, game]) => ({
    ...game,
    path: `/${slug}`
}))

const highlights = [
    {
        icon: 'i-lucide-trophy',
        title: 'Competitive gaming',
        description: 'Join the biggest esports competition in the Netherlands, featuring League of Legends, Valorant, Rocket League, CS2 and Geoguessr.'
    },
    {
        icon: 'i-lucide-users-round',
        title: 'Student community',
        description: 'Meet players and student associations from universities and schools across the Netherlands.'
    },
    {
        icon: 'i-lucide-radio',
        title: 'Live broadcasts',
        description: 'Follow the action live, or join the broadcast team and learn along the way.'
    },
    {
        icon: 'i-lucide-heart-handshake',
        title: 'Built by the community',
        description: 'A Dutch esports series organised by and for its community.'
    }
]

const registrationUrl = 'https://forms.gle/FYEZSgCKR5kbaKff6'
const discordUrl = 'https://discord.gg/7wfXF7AU3R'
</script>

<template>
    <main>
        <section class="bg-neutral-950 text-white">
            <UContainer class="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
                <div>
                    <p class="text-sm font-semibold uppercase text-primary">
                        Dutch Community Esports Series
                    </p>
                    <h1 class="mt-4 text-5xl font-bold sm:text-6xl lg:text-7xl">
                        Find your team. Play your game.
                    </h1>
                    <p class="mt-6 max-w-xl text-lg text-neutral-300">
                        The Netherlands' community esports competition for students and schools. Five games, one place
                        to compete.
                    </p>
                    <div class="mt-8 flex flex-wrap gap-3">
                        <UButton :to="registrationUrl" target="_blank" rel="noreferrer" size="lg" color="primary"
                            trailing-icon="i-lucide-arrow-up-right" label="Join the competition" />
                        <UButton :to="discordUrl" target="_blank" rel="noreferrer" size="lg" color="neutral"
                            variant="outline" trailing-icon="i-lucide-messages-square" label="Join our Discord" />
                    </div>
                </div>

                <div class="mx-auto max-w-sm">
                    <img src="/dces_logo_v1.png" alt="DCES" class="w-full" />
                </div>
            </UContainer>
        </section>

        <section class="py-16" aria-labelledby="games-heading">
            <UContainer>
                <div class="mb-9 flex flex-wrap items-end justify-between gap-5">
                    <div>
                        <p class="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Pick your arena</p>
                        <h2 id="games-heading"
                            class="mt-2 text-3xl font-bold text-neutral-950 dark:text-white sm:text-4xl">Five games.
                            Your next match.</h2>
                    </div>
                    <p class="text-base leading-7 text-neutral-600 dark:text-neutral-300">
                        Explore a competition built around the games you already love.
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    <NuxtLink v-for="game in games" :key="game.path" :to="game.path" class="group"
                        :style="{ '--game-color': `var(--color-${game.color}-500, var(--${game.color}))` }">
                        <UCard class="h-full transition-colors group-hover:ring-2 group-hover:ring-[var(--game-color)]"
                            :ui="{ body: 'flex min-h-40 flex-col items-center justify-center gap-4' }">
                            <UIcon :name="game.icon"
                                class="size-12 text-[color:var(--game-color)] drop-shadow-[0_0_3px_var(--color-neutral-500)]" />
                            <span class="text-center font-semibold">{{ game.name }}</span>
                        </UCard>
                    </NuxtLink>
                </div>
            </UContainer>
        </section>

        <section class="bg-neutral-50 py-16 dark:bg-neutral-900" aria-labelledby="community-heading">
            <UContainer>
                <div class="mb-10 max-w-2xl">
                    <p class="text-sm font-semibold uppercase tracking-[0.12em] text-primary">More than the match</p>
                    <h2 id="community-heading"
                        class="mt-2 text-3xl font-bold text-neutral-950 dark:text-white sm:text-4xl">
                        Esports is better together.
                    </h2>
                </div>
                <div class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    <article v-for="highlight in highlights" :key="highlight.title"
                        class="border-t-2 border-primary pt-5">
                        <UIcon :name="highlight.icon" class="mb-5 size-6 text-primary" />
                        <h3 class="text-lg font-semibold text-neutral-950 dark:text-white">{{ highlight.title }}</h3>
                        <p class="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{{
                            highlight.description }}</p>
                    </article>
                </div>
            </UContainer>
        </section>

        <section class="bg-primary-500 py-12 text-neutral-950" aria-labelledby="join-heading">
            <UContainer class="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.12em]">Your next game starts here</p>
                    <h2 id="join-heading" class="mt-2 text-3xl font-bold sm:text-4xl">Ready to compete?</h2>
                </div>
                <UButton :to="registrationUrl" target="_blank" rel="noreferrer" size="lg" color="neutral"
                    trailing-icon="i-lucide-arrow-up-right" label="Register your team" />
            </UContainer>
        </section>
    </main>
</template>