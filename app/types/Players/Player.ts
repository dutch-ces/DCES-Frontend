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
    Nationality1: z.string().max(2),
    Nationality2: z.string().max(2)
})

export type Player = z.infer<typeof PlayerSchema>
export type PlayerBrowse = z.infer<typeof PlayerBrowseSchema>

export function createFakePlayer(): Player {
    return {
        Id: faker.string.uuid(),
        Name: faker.animal.petName(),
        Association: faker.helpers.maybe(() => createFakeAssociation())
    }
}

export function createFakePlayerBrowse(): PlayerBrowse {
    return {
        Id: faker.string.uuid(),
        Name: faker.lorem.words(1),
        Association: createFakeAssociation(),
        LastTeam: createFakeTeam(),
        Nationality1: faker.location.countryCode(),
        Nationality2: faker.location.countryCode()
    }
}