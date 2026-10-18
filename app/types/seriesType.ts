import { z } from "zod"
import { faker } from "@faker-js/faker"

export const seriesSchema = z.object({
    series_id: z.number(),
    team1_name: z.string(),
    team2_name: z.string(),
    stage: z.number(),
    round: z.number(),
    is_upper: z.boolean(),
    best_of: z.number(),
    date_time: z.string(),

    is_played: z.boolean(),
    team1_score: z.number(),
    team2_score: z.number(),
    forfeit: z.boolean(),

})

export const matchSchema = z.object({
    
})    

export type standingsTeam = z.infer<typeof standingsTeamSchema>
export type standings = z.infer<typeof standingsSchema>

export function createFakeStandings(numTeams: number, overrides = {}): standings {
    const teams: standingsTeam[] = []
    for (let i = 0; i < numTeams; i++) {
        teams.push({
            team_id: i,
            team_name: faker.lorem.words(3),
            points: faker.number.int({ min: 0, max: 99 }),
            wins: faker.number.int({ min: 0, max: 99 }),
            losses: faker.number.int({ min: 0, max: 99 }),
            ties: faker.number.int({ min: 0, max: 99 }),
            tiebreaker: faker.number.int({ min: 0, max: 1000 }),
        })
    }
    return {
        teamarray: teams,
        division: faker.lorem.word(),
        split: faker.lorem.word()
    }
}