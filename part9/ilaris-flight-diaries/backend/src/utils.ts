import { NewDiaryEntry, Weather, Visibility } from "./types";
import * as z from "zod";

const newEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return newEntrySchema.parse(object);
};
