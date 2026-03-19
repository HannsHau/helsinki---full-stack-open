import { NewPatientEntry, Gender } from "./types";
import { z } from "zod";

const entrySchema = z.looseObject({
  type: z.string(),
});

const newPersonSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema).default([]),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPersonSchema.parse(object) as unknown as NewPatientEntry;
};
