import {
  NewPatientEntry,
  Gender,
  EntryWithoutId,
  HealthCheckRating,
} from "./types";
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

const dischargeSchema = z.object({
  date: z.iso.date(),
  criteria: z.string(),
});

const newBaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const hospitalEntrySchema = z.object({
  ...newBaseEntrySchema.shape,
  type: z.literal("Hospital"),
  discharge: dischargeSchema,
});

const sickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date(),
});

const occupationalHealthcareEntrySchema = z.object({
  ...newBaseEntrySchema.shape,
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: sickLeaveSchema.optional(),
});

const healthCheckEntrySchema = z.object({
  ...newBaseEntrySchema.shape,
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const newEntrySchema = z.discriminatedUnion("type", [
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
  healthCheckEntrySchema,
]);

export const toNewDiagnosisEntry = (object: unknown): EntryWithoutId => {
  return newEntrySchema.parse(object) as unknown as EntryWithoutId;
};

