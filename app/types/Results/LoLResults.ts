import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam, type Team } from "../Teams/Team"
import { lolChampionSchema, createFakeLolChampion, type lolChampion } from "../Characters/Champions"
import { seriesResultSchema } from "./Results"

export const lolSeriesMatchResultSchema = z.object({
    BlueTeam: TeamSchema.optional(),
    RedTeam: TeamSchema.optional(),
    BlueTeamChamps: z.array(lolChampionSchema).length(5).optional(),
    RedTeamChamps: z.array(lolChampionSchema).length(5).optional(),
    Forfeit: z.boolean(),
});

export const lolSeriesResultSchema = seriesResultSchema.safeExtend({
    Matches: z.array(lolSeriesMatchResultSchema),
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
    return {
        BlueTeam: teams[0],
        RedTeam: teams[1],
        BlueTeamChamps: blue_team_champs,
        RedTeamChamps: red_team_champs,
        Forfeit: faker.datatype.boolean(),
    }
}

export function createFakeLolSeries(overrides = {}): lolSeriesResult {
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
        Matches: [createFakeLolMatch([team1, team2]), createFakeLolMatch([team1, team2]), createFakeLolMatch([team1, team2])],
    }
}