import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam, type Team } from "../Teams/Team"
import { gameMapSchema } from "../Characters/Maps"
import { createFakeGameMap } from "../Characters/Maps"
import { seriesResultSchema } from "./Results"

export const csSeriesMatchResultSchema = z.object({
    team1: TeamSchema.optional(),
    team2: TeamSchema.optional(),
    team1_score: z.number().optional(),
    team2_score: z.number().optional(),
    map: gameMapSchema.optional(),
    forfeit: z.boolean(),
});

export const csSeriesResultSchema = seriesResultSchema.safeExtend({
    matches: z.array(csSeriesMatchResultSchema),
});


export type csSeriesResult = z.infer<typeof csSeriesResultSchema>
export type csSeriesMatchResult = z.infer<typeof csSeriesMatchResultSchema>

export function createFakeCsMatch(teams: [Team, Team] = [createFakeTeam(), createFakeTeam()], overrides = {}): csSeriesMatchResult {
    return{
        team1: teams[0],
        team2: teams[1],
        team1_score: faker.number.int(),
        team2_score: faker.number.int(),
        map: createFakeGameMap(),
        forfeit: faker.datatype.boolean(),
    }
}

export function createFakeCsSeries(overrides = {}): csSeriesResult {
    const team1: Team = createFakeTeam()
    const team2: Team = createFakeTeam()
    return {
        team1: team1,
        team2: team2,
        best_of: faker.number.int(),
        time: faker.date.recent().toISOString(),
        team1_score: faker.number.int(),
        team2_score: faker.number.int(),
        forfeit: faker.datatype.boolean(),
        stage: faker.helpers.arrayElement(["Groupstage", "Playoffs"] as const),
        round: faker.number.int(),
        matches: [createFakeCsMatch([team1, team2]), createFakeCsMatch([team1, team2]), createFakeCsMatch([team1, team2])],
    }
}