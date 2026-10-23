import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam, type Team } from "../Teams/Team"
import { lolChampionSchema, createFakeLolChampion, type lolChampion } from "../Characters/Champions"
import { lolItemSchema, createFakeLolItem, type lolItem } from "../Characters/Items"
import { createFakePlayer, PlayerSchema } from "../Players/Player"

export const lolDetailedMatchPlayerSchema = z.object({
    Player: PlayerSchema,
    Kills: z.number(),
    Deaths: z.number(),
    Assists: z.number(),
    KillParticipation: z.number(),
    CreepScore: z.number(),
    Champion: lolChampionSchema,
    Level: z.number(),
    Damage: z.number(),
    DamageTaken: z.number(),
    Summoner1Id: z.number(),
    Summoner2Id: z.number(),
    Rune1Id: z.number(),
    Rune2Id: z.number(),
    VisionScore: z.number(),
    Items: z.array(lolItemSchema).max(7),
    Trinket: lolItemSchema,
    Position: z.number(),
    DmgPercent: z.number().optional()
});

export const lolDetailedMatchTeamSchema = z.object({
    Players: z.array(lolDetailedMatchPlayerSchema).length(5),
    Barons: z.number(),
    Dragons: z.number(),
    Towers: z.number(),
    VoidGrubs: z.number(),
    Inhibitors: z.number(),
    Heralds: z.number()
});

export const lolDetailedMatchResultSchema = z.object({
    BlueTeam: TeamSchema.optional(),
    RedTeam: TeamSchema.optional(),
    BlueTeamStats: lolDetailedMatchTeamSchema.optional(),
    RedTeamStats: lolDetailedMatchTeamSchema.optional(),
    BlueTeamBans: z.array(lolChampionSchema).max(5).optional(),
    RedTeamBans: z.array(lolChampionSchema).max(5).optional(),
    Forfeit: z.boolean(),
    Duration: z.number(),
});

export const lolDetailedSeriesResultScehema = z.object({
    Team1: TeamSchema,
    Team2: TeamSchema,
    BestOf: z.number(),
    Time: z.iso.datetime(),
    Team1Score: z.number(),
    Team2Score: z.number(),
    Forfeit: z.boolean(),
    Stage: z.enum(["Groupstage", "Playoffs"]),
    Round: z.number(),
    Matches: z.array(lolDetailedMatchResultSchema),
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
        Player: createFakePlayer(),
        Kills: faker.number.int(),
        Deaths: faker.number.int(),
        Assists: faker.number.int(),
        KillParticipation: faker.number.int(),
        CreepScore: faker.number.int(),
        Champion: createFakeLolChampion(),
        Level: faker.number.int(),
        Damage: faker.number.int(),
        DamageTaken: faker.number.int(),
        Summoner1Id: faker.number.int(),
        Summoner2Id: faker.number.int(),
        Rune1Id: faker.number.int(),
        Rune2Id: faker.number.int(),
        VisionScore: faker.number.int(),
        Items: items,
        Trinket: createFakeLolItem(),
        Position: faker.number.int(),
        DmgPercent: faker.number.int(),
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
        Players: [],
        Barons: faker.number.int(),
        Dragons: faker.number.int(),
        Towers: faker.number.int(),
        VoidGrubs: faker.number.int(),
        Inhibitors: faker.number.int(),
        Heralds: faker.number.int(),
    }
    let red_team_stats: lolDetailedMatchTeam = {
        Players: [],
        Barons: faker.number.int(),
        Dragons: faker.number.int(),
        Towers: faker.number.int(),
        VoidGrubs: faker.number.int(),
        Inhibitors: faker.number.int(),
        Heralds: faker.number.int(),
    }
    for (let i = 0; i < 5; i++) {
        blue_team_stats.Players.push(createFakeLolDetailedMatchPlayer())
        red_team_stats.Players.push(createFakeLolDetailedMatchPlayer())
    }
    return {
        BlueTeam: teams[0],
        RedTeam: teams[1],
        BlueTeamStats: blue_team_stats,
        RedTeamStats: red_team_stats,
        BlueTeamBans: blue_team_bans,
        RedTeamBans: red_team_bans,
        Forfeit: faker.datatype.boolean(),
        Duration: faker.number.int(),
        ...overrides
    }
}

export function createFakeDetailedLolSeries(teams: [Team, Team] = [createFakeTeam(), createFakeTeam()], overrides = {}): lolDetailedSeriesResult {
    const [team1, team2] = teams;
    return {
        Team1: teams[0],
        Team2: teams[1],
        BestOf: faker.number.int(),
        Time: faker.date.recent().toISOString(),
        Team1Score: faker.number.int(),
        Team2Score: faker.number.int(),
        Forfeit: faker.datatype.boolean(),
        Stage: faker.helpers.arrayElement(["Groupstage", "Playoffs"] as const),
        Round: faker.number.int(),
        Matches: [createFakeDetailedLolMatch([team1, team2]), createFakeDetailedLolMatch([team1, team2]), createFakeDetailedLolMatch([team1, team2])],
        ...overrides
    }
}