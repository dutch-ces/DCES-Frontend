import { z } from "zod"
import { faker } from "@faker-js/faker"

export const gameMapSchema = z.object({
    map_display_name: z.string(),
    map_name: z.string(),
})
export type gameMap = z.infer<typeof gameMapSchema>

export function createFakeGameMap(overrides = {}): gameMap {
    return {
        map_display_name: faker.lorem.words(3),
        map_name: faker.lorem.words(3),
    }
}