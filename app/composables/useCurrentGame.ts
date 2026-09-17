const games = {
    lol: {
        name: 'League of Legends',
        color: 'lolyellow',
        icon: 'i-simple-icons:leagueoflegends'
    },
    valo: {
        name: 'Valorant',
        color: 'valored',
        icon: 'i-simple-icons:valorant'
    },
    cs2: {
        name: 'Counter-Strike',
        color: 'csorange',
        icon: 'i-simple-icons:counterstrike'
    },
    rl: {
        name: 'Rocket League',
        color: 'rlblue',
        icon: 'cbi:rocketleague'
    },
    geo: {
        name: 'GeoGuessr',
        color: 'green',
        icon: 'healthicons:geo-location'
    }
} as const

type GameUrl = keyof typeof games

export const useCurrentGame = () => {
    const route = useRoute()

    const currentGame = computed<GameUrl | null>(() => {
        const firstSegment = route.path.split('/')[1] || ''

        return firstSegment in games
            ? firstSegment as GameUrl
            : null
    })

    const currentGameData = computed(() =>
        currentGame.value
            ? games[currentGame.value]
            : null
    )

    return {
        games,
        currentGame,
        currentGameData
    }
}