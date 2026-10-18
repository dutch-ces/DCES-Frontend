import { z } from "zod"
import { faker } from "@faker-js/faker"

export const lolChampionSchema = z.object({
    champion_id: z.number(),
    champion_name: z.string(),
    champion_riot_name: z.string(),
})
export type lolChampion = z.infer<typeof lolChampionSchema>

export function createFakeLolChampion(overrides = {}): lolChampion {
    return {
        champion_id: faker.number.int(),
        champion_name: faker.lorem.words(3),
        champion_riot_name: faker.lorem.words(3),
    }
}