import { z } from "zod"
import { faker } from "@faker-js/faker"

export const valoAgentSchema = z.object({
    ValoId: z.number(),
    ValoName: z.string(),
    ValoRiotName: z.string(),
})
export type valoAgent = z.infer<typeof valoAgentSchema>

export function createFakeValoAgent(overrides = {}): valoAgent {
    return {
        ValoId: faker.number.int(),
        ValoName: faker.lorem.words(3),
        ValoRiotName: faker.lorem.words(3),
    }
}