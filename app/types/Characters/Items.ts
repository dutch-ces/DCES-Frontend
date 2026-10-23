import { z } from "zod"
import { faker } from "@faker-js/faker"

export const lolItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    riot_name: z.string(),
});

export type lolItem = z.infer<typeof lolItemSchema>

export function createFakeLolItem(): lolItem {
    return {
        id: 3153,
        name: "BORK",
        riot_name: "BORK",
    }
}
