import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, Stack, Box, Typography, Alert} from "@mui/material";
import { EntryWithoutId } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryForm = ({ onSubmit, error}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [codes, setCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const inputCodes: string[] = codes
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);

    const rating = Number(healthCheckRating);

    onSubmit({
      description,
      type: "HealthCheck",
      date,
      specialist,
      diagnosisCodes: inputCodes,
      healthCheckRating: rating,
    });

  };

  const onCancel = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setCodes("");
    setHealthCheckRating("");
  };

  return (
    <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
      <Typography variant="h4">Placeholder Form to enter an Entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        <Stack>
          <TextField
            label="Description"
            variant="standard"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            variant="standard"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            variant="standard"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />{" "}
          <TextField
            label="Codes"
            variant="standard"
            value={codes}
            onChange={({ target }) => setCodes(target.value)}
          />
          <TextField
            label="HealthCheckRating"
            variant="standard"
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
        </Stack>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: "20px",
          }}
        >
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEntryForm;
