import { z } from "zod"
import { faker } from "@faker-js/faker"

export const AssociationSchema = z.object({
    Id: z.uuid(),
    Name: z.string().max(35)
})


export type Association = z.infer<typeof AssociationSchema>

const AssociationPrefixes = [
    "Team",
    "Club",
    "FC",
    "Gaming",
    "Esports",
];

export function createFakeAssociationName(): string {
    const name = faker.animal.petName()
    const prefix = faker.helpers.arrayElement(AssociationPrefixes);

    const AssociationName = `${prefix} ${name}`;

    return AssociationName.length <= 35
        ? AssociationName
        : name.slice(0, 35).trim();
}

export function createFakeAssociation(): Association {
    return {
        Id: faker.string.uuid(),
        Name: createFakeAssociationName()
    }
}