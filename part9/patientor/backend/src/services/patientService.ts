import patients from "../../data/patients";
import { v4 as uuid } from "uuid";

import { NewPatientEntry, Patient, EntryWithoutId, Entry } from "../types";

const getNonSensitivePatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | null => {
  const patient = patients.find(p => p.id === id);
  if (!patient) return null;
  return patient;
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient = {
    id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addDiagnosis = (patientId: string, diagnosis: EntryWithoutId): Entry => {
  const id: string = uuid();
  const newEntry: Entry = {
    id,
    ...diagnosis,
  };
  const patient = patients.find(p => p.id === patientId);
  if (!patient) throw new Error("Oops, patient not found");

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addDiagnosis,
};
