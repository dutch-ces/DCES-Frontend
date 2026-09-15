<script setup lang="ts">
import type { standingsTeam } from '~/types/standingsType'
import {createFakeStandings} from '~/types/standingsType'
const data = createFakeStandings(8)
const props = defineProps<{
    testname: string
}>()
</script>

<template>
  <div class="division-standings">
    <NuxtLink :to="'/team/' + data.division">
      <div class="division-title">
        {{ data.split }} | Division {{ data.division }} {{ props.testname }}
      </div>
    </NuxtLink>
    <div class="division-header bg-neutral-100 dark:bg-neutral-900">
        <div>Team Name</div>
        <div>Pts</div>
        <div>W</div>
        <div>T</div>
        <div>L</div>
    </div>
    <div class="teams-grid bg-neutral-100 dark:bg-neutral-900">
      <StandingsRow v-for="team in data.teamarray" :key="team.points"  :standingsTeam = "team"/>
    </div>
  </div>
</template>

<style scoped>


.division-standings {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    container-name: div-standings-container;
    container-type: inline-size;
}

.division-title {
    background: var(--color-primary-500);
    color: var(--color-neutral-800);
    padding: 1rem 1.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.division-title::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        120deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    transition: left 0.5s ease;
}

.division-title:hover::before {
    left: 100%;
}


.division-header{
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
    padding: 10px 2rem 10px 3rem;
    gap: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: x-large;

}
.division-header>div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--white);
}

.teams-grid {
    
    padding: 0 1rem 1rem 1rem;
    font-size: x-large;
}

/* .division-header, .teams-grid {
    background: var(--color-neutral-900);
} */



@media (max-width:768px){
    .teams-grid, .division-header{
        font-size: large;
    }
}
@container div-standings-container (width < 600px) {
    .division-header{
        grid-template-columns: 3.5fr 0.5fr 0.5fr 0.5fr 0.5fr;
        gap: 0.5rem;
        padding: 0 1rem;
    }

    .division-title {
        height: 3rem;
    }

    .teams-grid, .division-header{
        font-size: large;
    }
}

</style>