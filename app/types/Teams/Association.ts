import { z } from "zod"
import { faker } from "@faker-js/faker"

export const AssociationSchema = z.object({
    Id: z.string(),
    Name: z.string().max(35)
})


export type Association = z.infer<typeof AssociationSchema>

export function createFakeAssociation(): Association {
    return {
        Id: faker.string.uuid(),
        Name: faker.string.alpha({ length: { min: 1, max: 35 } })
    }
}