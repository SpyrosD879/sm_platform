import { z } from "zod";
 
export const formSchema = z.object({
 message: z.string().min(2).max(300),
});
 
export type FormSchema = typeof formSchema;
