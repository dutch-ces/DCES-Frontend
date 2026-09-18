<script setup lang="ts">
    import type { DCESTeamMember } from '~/types/DCESTeamType'
    const props = withDefaults(defineProps<{
        member: DCESTeamMember
        color?: string
    }>(), {
        color: 'dcesorange'
    })
    var bordervar = 'border-' +props.color + '-500'
    var textvar = 'text-' +props.color + '-500'
</script>

<template>
    <div :class="`board-member group bg-neutral-200 dark:bg-neutral-900 color-neutral-800 dark:color-neutral-200 border-1 ${bordervar}`">
        <div class="member-profile">
            <NuxtImg 
                :src="`/dcesteam/${member.first_name}_${member.gamertag}_${member.last_name}.png`"
                :alt="`${member.first_name} ${member.last_name}`"
                :class="`member-avatar border-2 ${bordervar}`"
            />
            <div :class="`member-name ${textvar}`">{{ member.first_name }} {{ member.last_name }}</div>
            <div class="member-gamertag">"{{ member.gamertag }}"</div>
            <div class="member-role">{{ member.role }}</div>
            <div v-if = "member.founder" :class="`member-founder ${textvar}`">Founder</div>
        </div>

        <!-- Description popup -->
        <div :class="`member-description opacity-0 group-hover:opacity-100 bg-neutral-200 dark:bg-neutral-900 border-1 ${bordervar}`">
            <!-- Social Links -->
             
            <div class="social-links">
                <div v-if = "member.discord" class="board-discord" title="{{ member.discord }}">
                    <!-- <img src="{{ url_for('static', filename='images/webpageicons/discord.png') }}" alt="Discord" class="discord-icon"> -->
                    <span class="discord-tooltip">{{ member.discord }}</span>
                </div>
                <div v-if = "member.social_links" class="social-links">
                    <a v-for="(url, social) in member.social_links" :href="url" target="_blank" :title="social" class="social-link">
                        <!-- <img :src="`/images/webpageicons/${social}.png`" :alt="social" class="social-icon"> -->
                    </a>
                </div>

            </div>
            
            <!-- Description text -->
            <div class="description-text">
                {{ member.description }}
            </div>
        </div>
    </div>
</template>

<style scoped>

    .board-member {
        border-radius: 10px;
        padding: 25px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        z-index: 1;
    }

    .board-member:hover {
        background-color: var(--bg-darker-blue);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(207, 170, 1, 0.1);
        z-index: 10;
    }

    /* Member Profile */
    .member-profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px;
    }

    .member-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 15px;
        /* border: 2px solid var(--accent-dces); */
        transition: opacity 0.3s ease;
    }

    /* Fallback image styling */
    .member-avatar[src*="placeholder"] {
        opacity: 0.7;
        filter: grayscale(0.3);
    }

    .member-avatar[src*="placeholder"]:hover {
        opacity: 1;
        filter: grayscale(0);
    }

    /* Loading states */
    .member-avatar.loading {
        opacity: 0.5;
        filter: blur(1px);
    }

    .member-avatar.loaded {
        opacity: 1;
        filter: none;
    }

    .member-name {
        font-size: 1.3em;
        font-weight: 600;
        margin-bottom: 5px;
    }

    .member-gamertag {
        font-size: 1.1em;
        margin-bottom: 8px;
        font-style: italic;
    }

    .member-role {
        font-size: 1em;
        margin-bottom: 5px;
    }

    .member-founder {
        font-size: 0.9em;
        font-weight: 600;
    }

    /* Description Popup */
    .member-description {
        position: absolute;
        border-radius: 8px;
        padding: 20px;
        z-index: 9999;
        width: 300px;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .description-below {
        top: calc(100% + 10px);
    }

    .description-above {
        bottom: calc(100% + 10px);
    }

    /* Social Links */
    .social-links {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-bottom: 15px;
    }

    .social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background-color: var(--bg-medium-blue);
        border: 1px solid var(--accent-dces);
        border-radius: 50%;
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .social-link:hover {
        background-color: var(--accent-dces);
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(207, 170, 1, 0.3);
    }

    .board-member .social-icon {
        width: 18px;
        height: 18px;
        filter: brightness(0) invert(1);
        opacity: 0.8;
        transition: all 0.3s ease;
    }

    .social-link:hover .social-icon {
        filter: brightness(0) invert(0);
        opacity: 1;
    }

    .board-discord {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        text-transform: lowercase;
    }

    .discord-icon {
        width: 36px;
        height: 36px;
        object-fit: contain;
        transition: transform 0.2s ease;
    }

    .board-discord:hover .discord-icon {
        transform: scale(1.1);
    }

    .discord-tooltip {
        position: absolute;
        background-color: var(--bg-darkest-blue);
        padding: 0.5em 1em;
        border-radius: 4px;
        font-size: 0.9em;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        white-space: nowrap;
        z-index: 1000;
    }

    .board-discord:hover .discord-tooltip {
        opacity: 1;
    }




    /* Description Text */
    .description-text {
        font-size: 0.9em;
        line-height: 1.4;
        text-align: left;
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