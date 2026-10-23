import { z } from "zod"
import { faker } from "@faker-js/faker"

export const lolItemSchema = z.object({
    Id: z.number(),
    Name: z.string(),
    RiotName: z.string(),
});

export type lolItem = z.infer<typeof lolItemSchema>

export function createFakeLolItem(): lolItem {
    return {
        Id: 3153,
        Name: "BORK",
        RiotName: "BORK",
    }
}
