import { NewPatientEntry, Gender } from "./types";
import { z } from "zod";

const newPersonSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPersonSchema.parse(object);
};
