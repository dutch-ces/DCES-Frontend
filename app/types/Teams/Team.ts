import { z } from "zod"
import { faker } from "@faker-js/faker"
import { AssociationSchema, createFakeAssociation } from "./Association"

export const TeamSchema = z.object({
    Id: z.string(),
    Name: z.string().max(35),
    Association: AssociationSchema.optional(),
    Split: z.string().max(5),
    // Division: #TODO
})


export type Team = z.infer<typeof TeamSchema>

export function createFakeTeam(): Team {
    return {
        Id: faker.string.uuid(),
        Name: faker.string.alpha({ length: { min: 1, max: 35 } }),
        Association: createFakeAssociation(),
        Split: "S" + faker.number.int({ min: 1, max: 99 }) + "S" + faker.number.int({ min: 1, max: 2 })
    }
}