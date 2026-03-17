import patients from "../../data/patients";
import { v4 as uuid } from "uuid";

import { NonSensitivePatient, NewPatientEntry, Patient } from "../types";

// const getPatients = (): Patient[] => {
//   return patients;
// };

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
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
  addPatient,
};
