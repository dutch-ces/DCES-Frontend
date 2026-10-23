<script setup lang="ts">
defineProps<{
    title: string
    description: string
}>()
</script>

<template>
    <section class="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
        <UContainer class="py-12 md:py-16">
            <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div class="min-w-0">
                    <GameEyebrow />
                    <h1 class="mt-5 text-4xl font-bold sm:text-5xl">{{ title }}</h1>
                    <p class="mt-4 max-w-2xl text-base leading-7 text-neutral-700 dark:text-neutral-300">
                        {{ description }}
                    </p>
                </div>

                <slot name="aside" />
            </div>
        </UContainer>
    </section>
</template>