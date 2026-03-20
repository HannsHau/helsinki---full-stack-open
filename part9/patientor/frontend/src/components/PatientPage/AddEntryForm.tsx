import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Grid,
  Button,
  Stack,
  Box,
  Typography,
  Alert,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { EntryWithoutId, EntryType } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryForm = ({ onSubmit, error }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [codes, setCodes] = useState("");
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [slStartDate, setSlStartDate] = useState("");
  const [slEndDate, setSlEndDate] = useState("");
  const [disDate, setDisDate] = useState("");
  const [disCriteria, setCriteria] = useState("");

  const getCodes = () => {
    const inputCodes: string[] = codes
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);
    return inputCodes;
  };

  const buildHealthCheck = (): EntryWithoutId => {
    const rating = Number(healthCheckRating);

    return {
      description,
      type: EntryType.HealthCheck,
      date,
      specialist,
      diagnosisCodes: getCodes(),
      healthCheckRating: rating,
    };
  };

  const buildOccupationalHealthcare = (): EntryWithoutId => {
    return {
      description,
      type: EntryType.OccupationalHealthcare,
      date,
      specialist,
      diagnosisCodes: getCodes(),
      employerName: employerName,
      sickLeave: {
        startDate: slStartDate,
        endDate: slEndDate,
      },
    };
  };

  const buildHospital = (): EntryWithoutId => {
    return {
      description,
      type: EntryType.Hospital,
      date,
      specialist,
      diagnosisCodes: getCodes(),
      discharge: {
        date: disDate,
        criteria: disCriteria,
      },
    };
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    let input: EntryWithoutId;
    switch (entryType) {
      case EntryType.HealthCheck:
        input = buildHealthCheck();
        break;
      case EntryType.OccupationalHealthcare:
        input = buildOccupationalHealthcare();
        break;
      case EntryType.Hospital:
        input = buildHospital();
        break;
      default:
        throw new Error("invalid type");
    }

    onSubmit(input);
  };

  const onCancel = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setCodes("");
    setHealthCheckRating("");
    setEmployerName("");
    setSlStartDate("");
    setSlEndDate("");
    setDisDate("");
    setCriteria("");
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryType(event.target.value as EntryType);
  };

  return (
    <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
      <Typography variant="h4">New Entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <p>{entryType}</p>
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
          <FormControl>
            <FormLabel id="row-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={entryType}
              onChange={handleChangeType}
            >
              <FormControlLabel
                value={EntryType.HealthCheck}
                control={<Radio />}
                label={EntryType.HealthCheck}
              />
              <FormControlLabel
                value={EntryType.OccupationalHealthcare}
                control={<Radio />}
                label={EntryType.OccupationalHealthcare}
              />
              <FormControlLabel
                value={EntryType.Hospital}
                control={<Radio />}
                label={EntryType.Hospital}
              />
            </RadioGroup>
          </FormControl>
          {entryType === EntryType.HealthCheck && (
            <TextField
              label="HealthCheckRating"
              variant="standard"
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
            />
          )}
          {entryType === EntryType.OccupationalHealthcare && (
            <div>
              <TextField
                label="Employer Name"
                variant="standard"
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <Stack direction="row">
                <TextField
                  label="start"
                  variant="standard"
                  value={slStartDate}
                  onChange={({ target }) => setSlStartDate(target.value)}
                />
                <TextField
                  label="end"
                  variant="standard"
                  value={slEndDate}
                  onChange={({ target }) => setSlEndDate(target.value)}
                />
              </Stack>
            </div>
          )}
          {entryType === EntryType.Hospital && (
            <div>
              <TextField
                label="Date"
                variant="standard"
                value={disDate}
                onChange={({ target }) => setDisDate(target.value)}
              />{" "}
              <TextField
                label="Criteria"
                variant="standard"
                value={disCriteria}
                onChange={({ target }) => setCriteria(target.value)}
              />
            </div>
          )}
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
