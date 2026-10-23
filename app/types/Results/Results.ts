import { z } from "zod"
import { TeamSchema } from "../Teams/Team"

export const seriesResultSchema = z.object({
    Team1: TeamSchema,
    Team2: TeamSchema,
    Time: z.iso.datetime(),
    Team1Score: z.number(),
    Team2Score: z.number(),
    Forfeit: z.boolean(),
    Stage: z.enum(["Groupstage", "Playoffs"]),
    Round: z.number(),
    BestOf: z.number(),
});