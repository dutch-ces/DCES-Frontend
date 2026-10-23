import { z } from "zod"
import { faker } from "@faker-js/faker"
import { AssociationSchema, createFakeAssociation } from "./Association"
import { createFakeDivision, DivisionSchema } from "../Division/Division"

export const TeamSchema = z.object({
    Id: z.uuid(),
    Name: z.string().max(35),
    Association: AssociationSchema.optional(),
    Split: z.string().max(5),
    Division: DivisionSchema
})

export const TeamsSchema = z.array(TeamSchema)

export type Team = z.infer<typeof TeamSchema>
export type Teams = z.infer<typeof TeamsSchema>

const adjectives = [
    "Shadow", "Rapid", "Crimson", "Frozen", "Savage",
    "Silent", "Royal", "Neon", "Astral", "Iron",
    "Golden", "Storm", "Phantom", "Quantum", "Wild",
];

const nouns = [
    "Wolves", "Titans", "Phoenix", "Dragons", "Ravens",
    "Vipers", "Knights", "Falcons", "Reapers", "Giants",
    "Legends", "Warriors", "Eclipse", "Hawks", "Rangers",
];

export function createFakeTeamName(): string {
    const formats = [
        () => `${faker.helpers.arrayElement(adjectives)} ${faker.helpers.arrayElement(nouns)}`,
        () => `${faker.helpers.arrayElement(adjectives)} ${faker.helpers.arrayElement(nouns)} Esports`,
        () => `Team ${faker.helpers.arrayElement(nouns)}`,
    ];

    return faker.helpers
        .arrayElement(formats)()
        .slice(0, 35)
        .trim();
}

export function createFakeTeam(): Team {
    return {
        Id: faker.string.uuid(),
        Name: createFakeTeamName(),
        Association: createFakeAssociation(),
        Split: "S" + faker.number.int({ min: 1, max: 5 }) + "S" + faker.number.int({ min: 1, max: 2 }),
        Division: createFakeDivision()
    }
}

export function createFakeTeams(amount: number): Teams {
    return Array.from({ length: amount }, () => createFakeTeam())
}