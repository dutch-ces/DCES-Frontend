<script lang="ts" setup>

</script>

<template>
    <UFooter>
        <template #left>
            <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
        </template>
        <template #right>
            <UButton 
                icon="i-simple-icons-discord"
                color="neutral"
                to="https://discord.gg/7wfXF7AU3R"
                target="_blank"
                aria-label="Discord"
            />
            <UButton 
                icon="i-simple-icons-youtube"
                color="neutral"
                to="https://www.youtube.com/@DutchCES"
                target="_blank"
                aria-label="Youtube"
            />
            <UButton 
                icon="i-simple-icons-twitch"
                color="neutral"
                to="https://www.twitch.tv/dutch_ces"
                target="_blank"
                aria-label="Twitch"
            />
            <UButton 
                icon="i-simple-icons-instagram"
                color="neutral"
                to="https://www.instagram.com/dutchces/"
                target="_blank"
                aria-label="Instagram"
            />
            <UButton 
                icon="i-simple-icons-linkedin"
                color="neutral"
                to="https://www.linkedin.com/company/dutch-college-esports-series/"
                target="_blank"
                aria-label="LinkedIn"
            />
            <UButton 
                icon="i-simple-icons-x"
                color="neutral"
                to="https://x.com/dcesnl"
                target="_blank"
                aria-label="X"
            />
        </template>
    </UFooter>
</template>