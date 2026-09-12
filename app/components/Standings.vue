<script setup lang="ts">
import type { standingsTeam } from '~/types/standingsType'
import {createFakeStandings} from '~/types/standingsType'
const data = createFakeStandings(8)
</script>

<template>
  <div class="division-standings">
    <div class="division-title">
        {{ data.split }} | Division {{ data.division }}
    </div>
    <div class="division-header">
        <div>Team Name</div>
        <div>Pts</div>
        <div>W</div>
        <div>T</div>
        <div>L</div>
    </div>
    <div class="teams-grid">
      <StandingsRow v-for="team in data.teamarray" :key="team.points"  :standingsTeam = "team"/>
    </div>
  </div>
</template>

<style scoped>
.standings-section {
    padding: 3rem 2rem;
    position: relative;
    overflow: hidden;
}

.standings-content {
    max-width: 1500px;
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    position: relative;
    z-index: 1;
    grid-template-columns: 1fr 1fr 1fr;
}

/* Current Season Header */
.current-season-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.current-season-header h2 {
    color: var(--current-game-color);
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
}


.toggle-icon {
    font-size: 0.9rem;
    transition: transform 0.3s ease;
}

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
    background: var(--current-game-color);
    color: var(--bg-darkest-blue);
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
    height: 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: x-large;

}
.division-header>div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--white);
    /* padding: 1rem 0; */
}

.teams-grid {
    padding: 0 1rem 1rem 1rem;
    font-size: x-large;
}




@media (max-width:1400px){
    .standings-content {grid-template-columns: 1fr 1fr;}
}
@media (max-width:700px){
    .standings-content {grid-template-columns: 1fr;}
}
@media (max-width:768px){
    .standings-section {
        padding: 2rem 1rem;
    }
    .historical-seasons-section {
        padding: 0 1rem;
    }
    .current-season-header h2 {
        font-size: 1.5rem;
    }
    .historical-toggle-btn {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
    }

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