<script setup lang="ts">
import Standings from '~/components/Standings.vue';

definePageMeta({
    primaryColor: 'lolyellow'
})
</script>

<template>
    <h1 class="hero-text">League of Legends</h1>
    <div class="standings-section">
        <Standings/>
    </div>
</template>

<style scoped>
.standings-section {
    padding: 3rem 2rem;
    position: relative;
    overflow: hidden;
}
</style>