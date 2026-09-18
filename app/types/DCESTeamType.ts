import { z } from "zod"

export const DCESTeamMemberSchema = z.object({
    order: z.number(),
    active: z.boolean(),
    founder: z.boolean(),
    role: z.string(),
    first_name: z.string(),
    gamertag: z.string(),
    last_name: z.string(),
    discord: z.string(),
    description: z.string(),
    social_links: z.object({
        linkedin: z.string(),
        github: z.string(),
        twitter: z.string(),
        youtube: z.string(),
        twitch: z.string(),
    })
})


export type DCESTeamMember = z.infer<typeof DCESTeamMemberSchema>