import express from "express";
import { Response } from "express";
import patientService from "../services/patientService";
import { NonSensitivePatient } from "../types";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  console.log("Hello!");

  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    console.log("newPatientEntry: ", newPatientEntry);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
    //res.send("jey");
  } catch (error: unknown) {
    let errorMessage = "Something went wrong :(";
    if (error instanceof Error) {
      errorMessage = "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
