import { z } from "zod";
import { pageSchema } from "./pageSchema";

export const releaseSchema = z.object({
  version: z.string(),
  createdAt: z.string(),
  page: pageSchema
});

export type Release = z.infer<typeof releaseSchema>;
