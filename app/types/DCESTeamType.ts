import { z } from "zod"

export const DCESTeamMemberSchema = z.object({
    Order: z.number(),
    Active: z.boolean(),
    Founder: z.boolean(),
    Role: z.string(),
    FirstName: z.string(),
    Gamertag: z.string(),
    LastName: z.string(),
    Discord: z.string(),
    Description: z.string(),
    SocialLinks: z.object({
        LinkedIn: z.string().optional(),
        GitHub: z.string().optional(),
        Twitter: z.string().optional(),
        YouTube: z.string().optional(),
        Twitch: z.string().optional(),
        Linktree: z.string().optional(),
    })
})


export type DCESTeamMember = z.infer<typeof DCESTeamMemberSchema>