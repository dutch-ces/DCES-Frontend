import { z } from "zod"
import { TeamSchema} from "../Teams/Team"

export const seriesResultSchema = z.object({
    team1: TeamSchema,
    team2: TeamSchema,
    time: z.iso.datetime(),
    team1_score: z.number(),
    team2_score: z.number(),
    forfeit: z.boolean(),
    stage: z.enum(["Groupstage", "Playoffs"]),
    round: z.number(),
    best_of: z.number(),
});