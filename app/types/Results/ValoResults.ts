import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam, type Team } from "../Teams/Team"
import { valoAgentSchema, createFakeValoAgent, type valoAgent } from "../Characters/Agents"
import { gameMapSchema, createFakeGameMap } from "../Characters/Maps"
import { seriesResultSchema } from "./Results"

export const valoSeriesMatchResultSchema = z.object({
    Team1: TeamSchema.optional(),
    Team2: TeamSchema.optional(),
    Team1Agents: z.array(valoAgentSchema).length(5).optional(),
    Team2Agents: z.array(valoAgentSchema).length(5).optional(),
    Team1Score: z.number().optional(),
    Team2Score: z.number().optional(),
    Forfeit: z.boolean(),
    Map: gameMapSchema.optional()
});

export const valoSeriesResultsSchema = seriesResultSchema.safeExtend({
    Matches: z.array(valoSeriesMatchResultSchema),
});

export type valoSeriesResult = z.infer<typeof valoSeriesResultsSchema>
export type valoSeriesMatchResult = z.infer<typeof valoSeriesMatchResultSchema>

export function createFakeValoMatch(teams: [Team, Team] = [createFakeTeam(), createFakeTeam()], overrides = {}): valoSeriesMatchResult {
    let team1_agents: valoAgent[] = []
    let team2_agents: valoAgent[] = []
    for (let i = 0; i < 5; i++) {
        team1_agents.push(createFakeValoAgent())
        team2_agents.push(createFakeValoAgent())
    }
    return {
        Team1: teams[0],
        Team2: teams[1],
        Team1Agents: team1_agents,
        Team2Agents: team2_agents,
        Forfeit: faker.datatype.boolean(),
        Map: createFakeGameMap()
    }
}

export function createFakeValoSeries(overrides = {}): valoSeriesResult {
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
        Matches: [createFakeValoMatch([team1, team2]), createFakeValoMatch([team1, team2]), createFakeValoMatch([team1, team2])],
    }
}