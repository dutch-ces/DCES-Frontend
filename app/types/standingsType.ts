import { z } from "zod"
import { faker } from "@faker-js/faker"

export const standingsTeamSchema = z.object({
    team_id: z.number(),
    team_name: z.string(),
    points: z.number(),
    wins: z.number(),
    losses: z.number(),
    ties: z.number(),
    tiebreaker: z.number(),
})

export const standingsSchema = z.object({
    teamarray : z.array(standingsTeamSchema),
    division: z.string(),
    split: z.string()
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