import { Patient, Gender } from "../../types";
import { Container, Typography, Divider } from '@mui/material';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

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
  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "0.5em" }}>
        {patient.name} {getIcon(patient.gender)}
      </Typography >
      
      <Typography >ssn: {patient.ssn}</Typography>
      <Typography >occupation: {patient.occupation}</Typography >
    </Container>
  );
};

export default PatientPage;
