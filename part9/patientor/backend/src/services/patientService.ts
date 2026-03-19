import patients from "../../data/patients";
import { v4 as uuid } from "uuid";

import { NewPatientEntry, Patient } from "../types";

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

export default {
  getNonSensitivePatients,
  getPatient,
  addPatient,
};
