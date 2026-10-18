import { z } from "zod"
import { faker } from "@faker-js/faker"
import { TeamSchema, createFakeTeam } from "./Teams/Team"

export const scheduleSerieSchema = z.object({
    team1: TeamSchema,
    team2: TeamSchema,
    time: z.iso.datetime(),
    stage: z.enum(["Groupstage", "Playoffs"]),
    round: z.number(),
    best_of: z.number(),
});

export const ScheduleSchema = z.array(scheduleSerieSchema)

export type ScheduleSerie = z.infer<typeof scheduleSerieSchema>
export type Schedule = z.infer<typeof ScheduleSchema>

export function createFakeScheduleSerie(overrides = {}): ScheduleSerie {
    const best_of = faker.number.int({ min: 1, max: 10 })
    return {
        team1: createFakeTeam(),
        team2: createFakeTeam(),
        time: faker.date.soon({ days: { min: 1, max: 7 } }).toISOString(),
        best_of: best_of,
        stage: faker.helpers.arrayElement(["Groupstage", "Playoffs"] as const),
        round: faker.number.int({ min: 1, max: best_of }),
        ...overrides,
    }
}

export function createFakeSchedule(): Schedule {
    const count = faker.number.int({ min: 4, max: 15 })
    return Array.from({ length: count }, () => createFakeScheduleSerie());
}