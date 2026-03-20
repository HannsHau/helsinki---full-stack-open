import { useState } from "react";
import { Patient, Gender, EntryWithoutId, Entry } from "../../types";
import { Container, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import patientService from "../../services/patients";
import axios from 'axios';

import AddEntryForm from "./AddEntryForm";
import Entries from "./Entries";

interface Props {
  patient: Patient | undefined | null;
  addPatientsEntry: (id: string, entry: Entry) => void ;
}

const getIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    case Gender.Other:
      return <TransgenderIcon />;
    default:
      return <>Gender not found</>;
  }
};

const PatientPage = ({ patient, addPatientsEntry }: Props) => {
  const [error, setError] = useState<string>();
  if (!patient) return <>failed, no patient</>;

  const submitNewEntry = async (values: EntryWithoutId) => {
  try {
    const newEntry = await patientService.createEntry(patient.id, values);
    addPatientsEntry(patient.id, newEntry);
    setError("");
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data.error[0].message === "string") {
        const message = e?.response?.data.error[0].message;
        setError(message);
      } else {
        setError("Unrecognized axios error");
      }
    } else {
      console.error("Unknown error", e);
      setError("Unknown error");
    }
  }
};

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "0.5em" }}>
        {patient.name} {getIcon(patient.gender)}
      </Typography>

      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <AddEntryForm onSubmit={submitNewEntry} error={error}/>
      <Typography variant="h5" style={{ marginTop: "0.5em" }}>
        {patient.entries.length === 0 ? "no " : ""}entries
      </Typography>
      {patient.entries.length > 0 && <Entries entries={patient.entries} />}
    </Container>
  );
};

export default PatientPage;
