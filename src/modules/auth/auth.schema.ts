import { z } from "zod";

export const firebaseLoginSchema = z.object({
  idToken: z.string().min(1, "ID token is required"),
});
