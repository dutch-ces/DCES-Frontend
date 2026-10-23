import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam } from "./Teams/Team"

export const scheduleSerieSchema = z.object({
    Team1: TeamSchema,
    Team2: TeamSchema,
    Time: z.iso.datetime(),
    Stage: z.enum(["Groupstage", "Playoffs"]),
    Round: z.number(),
    BestOf: z.number(),
});

export const ScheduleSchema = z.array(scheduleSerieSchema)

export type ScheduleSerie = z.infer<typeof scheduleSerieSchema>
export type Schedule = z.infer<typeof ScheduleSchema>

export function createFakeScheduleSerie(overrides = {}): ScheduleSerie {
    const BestOf = faker.number.int({ min: 1, max: 10 })
    return {
        Team1: createFakeTeam(),
        Team2: createFakeTeam(),
        Time: faker.date.soon({ days: { min: 1, max: 7 } }).toISOString(),
        BestOf,
        Stage: faker.helpers.arrayElement(["Groupstage", "Playoffs"] as const),
        Round: faker.number.int({ min: 1, max: BestOf }),
        ...overrides,
    }
}

export function createFakeSchedule(): Schedule {
    const count = faker.number.int({ min: 4, max: 15 })
    return Array.from({ length: count }, () => createFakeScheduleSerie());
}