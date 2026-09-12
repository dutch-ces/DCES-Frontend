<script setup lang="ts">
import type { standingsTeam } from '~/types/standingsType'

const props = defineProps<{
    standingsTeam: standingsTeam
}>()

</script>

<template>
<div class="team">
    <div class="team-column logo-column">
        <!-- <img src="{{ url_for('static', filename= 'images/TeamLogos/LoL/' + standingsTeam.split + '/' + standingsTeam.team_name + '.png') }}" alt="{{ standingsTeam.team_name }} logo" class="team-logo"> -->
    </div>
    <div class="team-column name-column">
        <NuxtLink :to="'/team/' + standingsTeam.team_id">{{ standingsTeam.team_name }}</NuxtLink>
    </div>
    <div class="team-column points-column">
        <span class="points">{{ standingsTeam.points }}</span>
    </div>
    <div class="team-column record-column">
        <span class="wins">{{ standingsTeam.wins }}</span>
    </div>
    <div class="team-column record-column">
        <span class="ties">{{ standingsTeam.ties }}</span>
    </div>
    <div class="team-column record-column">
        <span class="losses">{{ standingsTeam.losses }}</span>
    </div>
</div>

</template>

<style scoped>
.team {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    align-items: center;
    /* height: 4rem; */
    height: auto;
    padding: 0 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;
    cursor: pointer;
}

/* I am beyond confused but I could not get this to work using height 100% and giving the parent a fixed height */

.team > :where(div){
    height: 100%;
}
/* .team, .logo-column{
    height: 60px;
} */

.team:hover {
    transform: scale(1.02);
    background-color: rgba(255, 255, 255, 0.05);
}

.team-column {
    display: flex;
    align-items: center;
}



.logo-column {
    justify-content: center;
    max-height: 60px;
}

.name-column {
    justify-content: flex-start;
}

.points-column, .record-column {
    justify-content: center;
}

.division-standings .team-name {
    text-decoration: none;
    color: var(--white);
    font-weight: 500;
    font-size: 1.1rem;
    min-height: auto;
    margin-top: 5px;
}

.team-logo {
    /* width: 40px; */
    /* height: 40px; */
    height: 90%;
    /* width: 80%; */
    object-fit: contain;
}

.team-stats {
    display: flex;
    gap: 1.5rem;
    align-items: center;
}

.points {
    font-weight: bold;
    color: var(--current-game-color);
}

.record {
    display: flex;
    gap: 0.5rem;
}

.wins { color: var(--green); }
.losses { color: var(--red); }
.ties { color: var(--text-light-gray); }
@container div-standings-container (width < 600px) {
    .team {
        grid-template-columns: 1fr 2.5fr 0.5fr 0.5fr 0.5fr 0.5fr;
        gap: 0.5rem;
        padding: 0;
    }
    .logo-column{
        height: 50px;
    }

    .name-column{
        margin: 8px 0;
    }
    .division-title {
        height: 3rem;
    }

    .team-name {
        font-size: 0.9rem;
    }
    .teams-grid, .division-header{
        font-size: large;
    }
}
</style>
