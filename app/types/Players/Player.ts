import { z } from "zod"
import { faker } from "@faker-js/faker"
import { AssociationSchema, createFakeAssociation } from "../Teams/Association"
import { TeamSchema, createFakeTeam } from "../Teams/Team"

export const PlayerSchema = z.object({
    Id: z.uuid(),
    Name: z.string().max(35),
    Association: AssociationSchema.optional(),
})

export const PlayerBrowseSchema = PlayerSchema.safeExtend({
    LastTeam: TeamSchema,
    nationality1: z.string().max(2),
    nationality2: z.string().max(2)
})

export type PlayerBrowse = z.infer<typeof PlayerBrowseSchema>


export function createFakePlayerBrowse(): PlayerBrowse {
    return {
        Id: faker.string.uuid(),
        Name: faker.lorem.words(1),
        Association: createFakeAssociation(),
        LastTeam: createFakeTeam(),
        nationality1: faker.location.countryCode(),
        nationality2: faker.location.countryCode()
    }
}