<script setup lang="ts">
const { currentGameData } = useCurrentGame()
</script>

<template>
    <div class="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
        <UIcon :name="currentGameData?.icon ?? 'i-lucide-gamepad-2'" class="size-5" aria-hidden="true" />
        {{ currentGameData?.name ?? 'Competition' }}
    </div>
</template>