import { useState, useEffect } from "react";
import {
  Entry,
  Diagnosis,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from "../../types";
import { Typography, List, ListItem, ListItemText, Box } from "@mui/material";
import { green, yellow, orange, red } from "@mui/material/colors";
import { assertNever } from "../../utils";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";

import diagnosisService from "../../services/diagnoses";

const Hospital = (entry: HospitalEntry) => {
  return (
    <Box component="section" sx={{ border: 1 }}>
      <Typography>
        {entry.date} <LocalHospitalIcon />{" "}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const OccupationalHealthcare = (entry: OccupationalHealthcareEntry) => {
  return (
    <Box component="section" sx={{ border: 1 }}>
      <Typography>
        {entry.date} <WorkIcon /> {entry.employerName}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const getHeart = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon sx={{ color: green[500] }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon sx={{ color: yellow[500] }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon sx={{ color: orange[500] }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon sx={{ color: red[500] }} />;
  }
};

const HealthCheck = (entry: HealthCheckEntry) => {
  return (
    <Box component="section" sx={{ border: 1 }}>
      <Typography>
        {entry.date} <MedicalServicesIcon />{" "}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      {getHeart(entry.healthCheckRating)}
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

interface EntryProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital {...entry} />;
      break;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare {...entry} />;
      break;
    case "HealthCheck":
      return <HealthCheck {...entry} />;
      break;
    default:
      return assertNever(entry);
  }
};

interface EntriesProps {
  entries: Entry[];
}

const Entries = ({ entries }: EntriesProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const byDate = (a:Entry, b:Entry) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  }

  return (
    <div>
      {entries.sort(byDate).map((e) => {
        return (
          <div key={e.id + "map"}>
            <EntryDetails entry={e} />
            <List key={e.id}>
              {e.diagnosisCodes?.map((code) => (
                <ListItem key={code + "_item"}>
                  <ListItemText>
                    ● {code} {diagnoses.find((d) => d.code === code)?.name}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
        );
      })}
    </div>
  );
};

export default Entries;
