<script setup lang="ts">
    import type { DCESTeamMember } from '~/types/DCESTeamType'
    import boardMembersData from '~/static/boardmembers.json'
    import { ref } from 'vue'
    
    const boardMembers = boardMembersData.boardMembers as DCESTeamMember[]
    let activeBoard = boardMembers.filter(member => member.active)
    let inactiveBoard = boardMembers.filter(member => !member.active)


    const selectedBoard = ref<'active'|'inactive'>('active')

</script>

<template>
    <h1>Our Team</h1>
    <!-- Board selector -->
    <div class="flex gap-3 mb-6">
        <button
            @click="selectedBoard = 'active'"
            :class="selectedBoard === 'active'
                ? 'bg-dcesorange-500 text-white'
                : 'bg-neutral-500 text-neutral-800'"
            class="px-4 py-2 rounded-lg"
        >
            Active Board
        </button>

        <button
            @click="selectedBoard = 'inactive'"
            :class="selectedBoard === 'inactive'
                ? 'bg-dcesorange-500 text-white'
                : 'bg-neutral-500 text-neutral-800'"
            class="px-4 py-2 rounded-lg"
        >
            Old Board
        </button>
    </div>

    <!-- Active Board -->
    <div v-if="selectedBoard === 'active'">
        <div class="board-members-grid" id="board-content">
            <DCESTeamMember 
            v-for="member in activeBoard" 
            :key="member.order" 
            :member="member" 
            color="valored"/>
        </div>
    </div>

    <!-- Old Board -->
    <div v-if="selectedBoard === 'inactive'">
        <div class="board-members-grid" id="exboard-content">
            <DCESTeamMember v-for="member in inactiveBoard" :key="member.order" :member="member" color="valored"/>
        </div>
    </div>
    
</template>

<style scoped>
    /* Board Page Layout - Modern Design */
    .details-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* width: 100%; */
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px;
    }

    #board-content, #exboard-content {
        background: none;
        border: none;
    }


    /* Header Section */
    .board-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0;
        text-align: center;
    }

    .board-logo {
        width: 120px;
        height: auto;
        margin-bottom: 20px;
    }

    .board-title {
        color: var(--accent-dces);
        font-size: 2.5em;
        margin: 0;
        font-weight: 600;
    }

    /* Tab Navigation */
    .tabs {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
        margin-bottom: 0;
        width: 100%;
    }

    .tab-button {
        background-color: var(--bg-darkest-blue);
        color: var(--text-light-gray);
        border: 1px solid var(--accent-dces);
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1.1em;
    }

    .tab-button:hover {
        background-color: var(--bg-darker-blue);
        color: var(--white);
    }

    .tab-button.active {
        background-color: var(--accent-dces);
        color: var(--bg-darkest-blue);
        border-color: var(--accent-dces);
    }

    .tab-content {
        width: 90%;
        max-width: 1400px;
        /* margin: 0 auto; */
        padding: 20px;
    }

    /* Board Members Grid */
    .board-members-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }




    
    /* Responsive Design */
    @media (max-width: 768px) {
        .board-members-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .board-member {
            padding: 20px;
        }
        
        .member-description {
            width: 280px;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .tabs {
            flex-direction: column;
            gap: 10px;
        }
        
        .tab-button {
            width: 100%;
            max-width: 200px;
            margin: 0 auto;
        }
    }

    @media (max-width: 480px) {
        .board-title {
            font-size: 2em;
        }
        
        .member-description {
            width: 250px;
        }
    } 
</style>