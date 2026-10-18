import { z } from "zod"
import { faker } from "@faker-js/faker"

export const DivisionSchema = z.object({
    Id: z.uuid(),
    Name: z.string(),
    Split: z.string()
})


export type Division = z.infer<typeof DivisionSchema>

export function createFakeDivision(): Division {
    return {
        Id: faker.string.uuid(),
        Name: faker.number.int() + faker.string.alpha(),
        Split: faker.string.alpha()
    }
}