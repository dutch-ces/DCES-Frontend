import { z } from "zod"
import { faker } from "@faker-js/faker"

export const valoAgentSchema = z.object({
    valo_id: z.number(),
    valo_name: z.string(),
    valo_riot_name: z.string(),
})
export type valoAgent = z.infer<typeof valoAgentSchema>

export function createFakeValoAgent(overrides = {}): valoAgent {
    return {
        valo_id: faker.number.int(),
        valo_name: faker.lorem.words(3),
        valo_riot_name: faker.lorem.words(3),
    }
}