import { Patient, Gender } from "../../types";
import { Container, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import Entries from "./Entries";

interface Props {
  patient: Patient | undefined | null;
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

const PatientPage = ({ patient }: Props) => {
  if (!patient) return <>failed, no patient</>;

  console.log("patient: ", patient);

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "0.5em" }}>
        {patient.name} {getIcon(patient.gender)}
      </Typography>

      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography variant="h5" style={{ marginTop: "0.5em" }}>
        {patient.entries.length === 0 ? "no " : ""}entries
      </Typography>
      {patient.entries.length > 0 && <Entries entries={patient.entries} />}
    </Container>
  );
};

export default PatientPage;
