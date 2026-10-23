import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam } from "../Teams/Team"
import type { Team } from "../Teams/Team"
import { lolChampionSchema, createFakeLolChampion} from "../Characters/Champions"
import type { lolChampion } from "../Characters/Champions"
import {seriesResultSchema} from "./Results"

export const lolSeriesMatchResultSchema = z.object({
    blue_team: TeamSchema.optional(),
    red_team: TeamSchema.optional(),
    blue_team_champs: z.array(lolChampionSchema).length(5).optional(),
    red_team_champs: z.array(lolChampionSchema).length(5).optional(),
    forfeit: z.boolean(),
});

export const lolSeriesResultSchema = seriesResultSchema.safeExtend({
    matches: z.array(lolSeriesMatchResultSchema),
});

export type lolSeriesResult = z.infer<typeof lolSeriesResultSchema>
export type lolSeriesMatchResult = z.infer<typeof lolSeriesMatchResultSchema>

export function createFakeLolMatch(teams: [Team, Team] = [createFakeTeam(), createFakeTeam()], overrides = {}): lolSeriesMatchResult {
    let blue_team_champs: lolChampion[] = []
    let red_team_champs: lolChampion[] = []
    for (let i = 0; i < 5; i++) {
        blue_team_champs.push(createFakeLolChampion())
        red_team_champs.push(createFakeLolChampion())
    }
    return{
        blue_team: teams[0],
        red_team: teams[1],
        blue_team_champs: blue_team_champs,
        red_team_champs: red_team_champs,
        forfeit: faker.datatype.boolean(),
    }
}

export function createFakeLolSeries(overrides = {}): lolSeriesResult {
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
        matches: [createFakeLolMatch([team1, team2]), createFakeLolMatch([team1, team2]), createFakeLolMatch([team1, team2])],
    }
}