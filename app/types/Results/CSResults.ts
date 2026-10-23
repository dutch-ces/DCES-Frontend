import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam, type Team } from "../Teams/Team"
import { gameMapSchema } from "../Characters/Maps"
import { createFakeGameMap } from "../Characters/Maps"
import { seriesResultSchema } from "./Results"

export const csSeriesMatchResultSchema = z.object({
    Team1: TeamSchema.optional(),
    Team2: TeamSchema.optional(),
    Team1Score: z.number().optional(),
    Team2Score: z.number().optional(),
    Map: gameMapSchema.optional(),
    Forfeit: z.boolean(),
});

export const csSeriesResultSchema = seriesResultSchema.safeExtend({
    Matches: z.array(csSeriesMatchResultSchema),
});


export type csSeriesResult = z.infer<typeof csSeriesResultSchema>
export type csSeriesMatchResult = z.infer<typeof csSeriesMatchResultSchema>

export function createFakeCsMatch(teams: [Team, Team] = [createFakeTeam(), createFakeTeam()], overrides = {}): csSeriesMatchResult {
    return {
        Team1: teams[0],
        Team2: teams[1],
        Team1Score: faker.number.int(),
        Team2Score: faker.number.int(),
        Map: createFakeGameMap(),
        Forfeit: faker.datatype.boolean(),
    }
}

export function createFakeCsSeries(overrides = {}): csSeriesResult {
    const team1: Team = createFakeTeam()
    const team2: Team = createFakeTeam()
    return {
        Team1: team1,
        Team2: team2,
        BestOf: faker.number.int(),
        Time: faker.date.recent().toISOString(),
        Team1Score: faker.number.int(),
        Team2Score: faker.number.int(),
        Forfeit: faker.datatype.boolean(),
        Stage: faker.helpers.arrayElement(["Groupstage", "Playoffs"] as const),
        Round: faker.number.int(),
        Matches: [createFakeCsMatch([team1, team2]), createFakeCsMatch([team1, team2]), createFakeCsMatch([team1, team2])],
    }
}