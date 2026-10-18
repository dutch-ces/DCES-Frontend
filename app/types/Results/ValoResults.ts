import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam } from "../Teams/Team"
import type { Team } from "../Teams/Team"
import { valoAgentSchema, createFakeValoAgent } from "../Characters/Agents"
import type { valoAgent } from "../Characters/Agents"
import { gameMapSchema, createFakeGameMap } from "../Characters/Maps"
import {seriesResultSchema} from "./results"

export const valoSeriesMatchResultSchema = z.object({
    team1: TeamSchema.optional(),
    team2: TeamSchema.optional(),
    team1_agents: z.array(valoAgentSchema).length(5).optional(),
    team2_agents: z.array(valoAgentSchema).length(5).optional(),
    team1_score: z.number().optional(),
    team2_score: z.number().optional(),
    forfeit: z.boolean(),
    map: gameMapSchema.optional()
});

export const valoSeriesResultsSchema = seriesResultSchema.safeExtend({
    matches: z.array(valoSeriesMatchResultSchema),
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
    return{
        team1: teams[0],
        team2: teams[1],
        team1_agents: team1_agents,
        team2_agents: team2_agents,
        forfeit: faker.datatype.boolean(),
        map: createFakeGameMap()
    }
}

export function createFakeValoSeries(overrides = {}): valoSeriesResult {
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
        matches: [createFakeValoMatch([team1, team2]), createFakeValoMatch([team1, team2]), createFakeValoMatch([team1, team2])],
    }
}