import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam } from "./Teams/Team"
import type { Team } from "./Teams/Team"
import { lolChampionSchema, createFakeLolChampion} from "./Champions/Champions"
import type { lolChampion } from "./Champions/Champions"

export const seriesScheduleSchema = z.object({
    team1: TeamSchema,
    team2: TeamSchema,
    time: z.iso.datetime(),
    stage: z.enum(["Groupstage", "Playoffs"]),
    round: z.number(),
    best_of: z.number(),
});

export const lolSeriesMatchResultSchema = z.object({
    blue_team: TeamSchema.optional(),
    red_team: TeamSchema.optional(),
    blue_team_champs: z.array(lolChampionSchema).optional(),
    red_team_champs: z.array(lolChampionSchema).optional(),
    forfeit: z.boolean(),
});


export type SeriesSchedule = z.infer<typeof seriesScheduleSchema>


export function createFakeScheduleSeries(overrides = {}): SeriesSchedule {
    return {
        team1: createFakeTeam(),
        team2: createFakeTeam(),
        time: faker.date.recent().toISOString(),
        best_of: faker.number.int(),
        stage: faker.helpers.arrayElement(["Groupstage", "Playoffs"] as const),
        round: faker.number.int(),
    }
}