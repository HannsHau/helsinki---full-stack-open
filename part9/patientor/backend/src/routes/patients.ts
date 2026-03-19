import express from "express";
import { Response } from "express";
import patientService from "../services/patientService";
import { NonSensitivePatient , Patient} from "../types";
import { toNewPatientEntry } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res: Response<Patient | { error: string } >) => {
  const patient = patientService.getPatient(req.params.id);
  if (!patient) {
    res.status(404).send({ error: 'id not exists' });
  } else {
    res.send(patient);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
