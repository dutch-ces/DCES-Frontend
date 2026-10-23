import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam, type Team } from "../Teams/Team"
import { lolChampionSchema, createFakeLolChampion, type lolChampion } from "../Characters/Champions"
import { lolItemSchema, createFakeLolItem, type lolItem } from "../Characters/Items"

export const lolDetailedMatchPlayerSchema = z.object({
    puuid: z.string(),
    kills: z.number(),
    deaths: z.number(),
    assists: z.number(),
    kill_participation: z.number(),
    creep_score: z.number(),
    champion: lolChampionSchema,
    level: z.number(),
    damage: z.number(),
    damage_taken: z.number(),
    summoner1_id: z.number(),
    summoner2_id: z.number(),
    rune1_id: z.number(),
    rune2_id: z.number(),
    vision_score: z.number(),
    items: z.array(lolItemSchema).length(7),  
    trinket: lolItemSchema,
    position: z.number(),
    dmg_percent: z.number().optional()
});

export const lolDetailedMatchTeamSchema = z.object({    
    players: z.array(lolDetailedMatchPlayerSchema).length(5),
    barons: z.number(),
    dragons: z.number(),
    towers: z.number(),
    void_grubs: z.number(),
    inhibitors: z.number(),
    heralds: z.number()
});

export const lolDetailedMatchResultSchema = z.object({
    blue_team: TeamSchema.optional(),
    red_team: TeamSchema.optional(),
    blue_team_stats: lolDetailedMatchTeamSchema.optional(),
    red_team_stats: lolDetailedMatchTeamSchema.optional(),
    blue_team_bans: z.array(lolChampionSchema).max(5).optional(),
    red_team_bans: z.array(lolChampionSchema).max(5).optional(),
    forfeit: z.boolean(),
    duration: z.number(),
});

export const lolDetailedSeriesResultScehema = z.object({
    team1: TeamSchema,
    team2: TeamSchema,
    best_of: z.number(),
    time: z.iso.datetime(),
    team1_score: z.number(),
    team2_score: z.number(),
    forfeit: z.boolean(),
    stage: z.enum(["Groupstage", "Playoffs"]),
    round: z.number(),
    matches: z.array(lolDetailedMatchResultSchema),
});

export type lolDetailedMatchResult = z.infer<typeof lolDetailedMatchResultSchema>
export type lolDetailedSeriesResult = z.infer<typeof lolDetailedSeriesResultScehema>
export type lolDetailedMatchTeam = z.infer<typeof lolDetailedMatchTeamSchema>
export type lolDetailedMatchPlayer = z.infer<typeof lolDetailedMatchPlayerSchema>

export function createFakeLolDetailedMatchPlayer(overrides = {}): lolDetailedMatchPlayer {
    let items: lolItem[] = []
    for (let i = 0; i < 7; i++) {
        items.push(createFakeLolItem())
    }
    return {
        puuid: faker.string.uuid(),
        kills: faker.number.int(),
        deaths: faker.number.int(),
        assists: faker.number.int(),
        kill_participation: faker.number.int(),
        creep_score: faker.number.int(),
        champion: createFakeLolChampion(),
        level: faker.number.int(),
        damage: faker.number.int(),
        damage_taken: faker.number.int(),
        summoner1_id: faker.number.int(),
        summoner2_id: faker.number.int(),
        rune1_id: faker.number.int(),
        rune2_id: faker.number.int(),
        vision_score: faker.number.int(),
        items: items,
        trinket: createFakeLolItem(),
        position: faker.number.int(),
        dmg_percent: faker.number.int(),
        ...overrides
    }
}
export function createFakeDetailedLolMatch(teams: [Team, Team] = [createFakeTeam(), createFakeTeam()], overrides = {}): lolDetailedMatchResult {
    let blue_team_bans: lolChampion[] = []
    let red_team_bans: lolChampion[] = []
    for (let i = 0; i < 5; i++) {
        blue_team_bans.push(createFakeLolChampion())
        red_team_bans.push(createFakeLolChampion())
    }
    let blue_team_stats: lolDetailedMatchTeam = {
        players: [],
        barons: faker.number.int(),
        dragons: faker.number.int(),
        towers: faker.number.int(),
        void_grubs: faker.number.int(),
        inhibitors: faker.number.int(),
        heralds: faker.number.int(),
    }
    let red_team_stats: lolDetailedMatchTeam = {
        players: [],
        barons: faker.number.int(),
        dragons: faker.number.int(),
        towers: faker.number.int(),
        void_grubs: faker.number.int(),
        inhibitors: faker.number.int(),
        heralds: faker.number.int(),
    }
    for (let i = 0; i < 5; i++) {
        blue_team_stats.players.push(createFakeLolDetailedMatchPlayer())
        red_team_stats.players.push(createFakeLolDetailedMatchPlayer())
    }
    return{
        blue_team: teams[0],
        red_team: teams[1],
        blue_team_stats: blue_team_stats,
        red_team_stats: red_team_stats,
        blue_team_bans: blue_team_bans,
        red_team_bans: red_team_bans,
        forfeit: faker.datatype.boolean(),
        duration: faker.number.int(),
        ...overrides
    }
}

export function createFakeDetailedLolSeries(teams: [Team, Team] = [createFakeTeam(), createFakeTeam()], overrides = {}): lolDetailedSeriesResult {
    const [team1, team2] = teams;
    return {
        team1: teams[0],
        team2: teams[1],
        best_of: faker.number.int(),
        time: faker.date.recent().toISOString(),
        team1_score: faker.number.int(),
        team2_score: faker.number.int(),
        forfeit: faker.datatype.boolean(),
        stage: faker.helpers.arrayElement(["Groupstage", "Playoffs"] as const),
        round: faker.number.int(),
        matches: [createFakeDetailedLolMatch([team1, team2]), createFakeDetailedLolMatch([team1, team2]), createFakeDetailedLolMatch([team1, team2])],
        ...overrides
    }
}