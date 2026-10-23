import { z } from "zod"
import { faker } from "@faker-js/faker"

export const lolChampionSchema = z.object({
    ChampionId: z.number(),
    ChampionName: z.string(),
    ChampionRiotName: z.string(),
})
export type lolChampion = z.infer<typeof lolChampionSchema>

export function createFakeLolChampion(overrides = {}): lolChampion {
    return {
        ChampionId: faker.number.int(),
        ChampionName: faker.lorem.words(3),
        ChampionRiotName: faker.lorem.words(3),
    }
}