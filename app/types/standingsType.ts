import { z } from "zod"
import { faker } from "@faker-js/faker"

export const standingsTeamSchema = z.object({
    TeamId: z.number(),
    TeamName: z.string(),
    Points: z.number(),
    Wins: z.number(),
    Losses: z.number(),
    Ties: z.number(),
    Tiebreaker: z.number(),
})

export const standingsSchema = z.object({
    TeamArray: z.array(standingsTeamSchema),
    Division: z.string(),
    Split: z.string()
})

export type standingsTeam = z.infer<typeof standingsTeamSchema>
export type standings = z.infer<typeof standingsSchema>

export function createFakeStandings(numTeams: number, overrides = {}): standings {
    const teams: standingsTeam[] = []
    for (let i = 0; i < numTeams; i++) {
        teams.push({
            TeamId: i,
            TeamName: faker.lorem.words(3),
            Points: faker.number.int({ min: 0, max: 99 }),
            Wins: faker.number.int({ min: 0, max: 99 }),
            Losses: faker.number.int({ min: 0, max: 99 }),
            Ties: faker.number.int({ min: 0, max: 99 }),
            Tiebreaker: faker.number.int({ min: 0, max: 1000 }),
        })
    }
    return {
        TeamArray: teams,
        Division: faker.lorem.word(),
        Split: faker.lorem.word()
    }
}