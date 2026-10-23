import { z } from "zod"
import { faker } from "@faker-js/faker"

export const gameMapSchema = z.object({
    MapDisplayName: z.string(),
    MapName: z.string(),
})
export type gameMap = z.infer<typeof gameMapSchema>

export function createFakeGameMap(overrides = {}): gameMap {
    return {
        MapDisplayName: faker.lorem.words(3),
        MapName: faker.lorem.words(3),
    }
}