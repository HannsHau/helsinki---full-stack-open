import { useState, useEffect } from "react";
import { Entry, Diagnosis } from "../../types";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

import diagnosisService from "../../services/diagnoses";

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

  return (
    <div>
      {entries.map((e) => {
        return (
          <div>
            <Typography>
              {e.date} {e.description}
            </Typography>
            <List>
              {e.diagnosisCodes?.map((code) => (
                <ListItem>
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
