import { useState, useEffect, SyntheticEvent } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { EntryWithoutId, EntryType, Diagnosis } from "../../types";

import diagnosisService from "../../services/diagnoses";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryForm = ({ onSubmit, error }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [specialist, setSpecialist] = useState("");
  const [diaCodes, setDiaCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [slStartDate, setSlStartDate] = useState<Dayjs | null>(dayjs());
  const [slEndDate, setSlEndDate] = useState<Dayjs | null>(dayjs());
  const [disDate, setDisDate] = useState<Dayjs | null>(dayjs());
  const [disCriteria, setCriteria] = useState("");
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const buildHealthCheck = (): EntryWithoutId => {
    const rating = Number(healthCheckRating);

    return {
      description,
      type: EntryType.HealthCheck,
      date: date?.format("YYYY-MM-DD") ?? "",
      specialist,
      diagnosisCodes: diaCodes,
      healthCheckRating: rating,
    };
  };

  const buildOccupationalHealthcare = (): EntryWithoutId => {
    return {
      description,
      type: EntryType.OccupationalHealthcare,
      date: date?.format("YYYY-MM-DD") ?? "",
      specialist,
      diagnosisCodes: diaCodes,
      employerName: employerName,
      sickLeave: {
        startDate: slStartDate?.format("YYYY-MM-DD") ?? "",
        endDate: slEndDate?.format("YYYY-MM-DD") ?? "",
      },
    };
  };

  const buildHospital = (): EntryWithoutId => {
    return {
      description,
      type: EntryType.Hospital,
      date: date?.format("YYYY-MM-DD") ?? "",
      specialist,
      diagnosisCodes: diaCodes,
      discharge: {
        date: disDate?.format("YYYY-MM-DD") ?? "",
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
    setDate(dayjs());
    setSpecialist("");
    setDiaCodes([]);
    setHealthCheckRating("");
    setEmployerName("");
    setSlStartDate(dayjs());
    setSlEndDate(dayjs());
    setDisDate(dayjs());
    setCriteria("");
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntryType(event.target.value as EntryType);
  };

  const handleChangeRating = (event: SelectChangeEvent) => {
    console.log("Event: ", event);
    setHealthCheckRating(event.target.value);
  };

  const handleChangeCodes = (event: SelectChangeEvent<typeof diaCodes>) => {
    const {
      target: { value },
    } = event;

    setDiaCodes(
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        <Typography variant="h4" padding={2}>
          New Entry
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={addEntry}>
          <Stack spacing={3}>
            <TextField
              label="Description"
              variant="standard"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
            <TextField
              label="Specialist"
              variant="standard"
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />{" "}
            <FormControl>
              <InputLabel>Codes</InputLabel>
              <Select multiple value={diaCodes} onChange={handleChangeCodes}>
                {diagnoses.map((d) => (
                  <MenuItem key={d.code} value={d.code}>
                    {d.code} - {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              <FormControl>
                <InputLabel>Rating</InputLabel>
                <Select
                  label="Age"
                  value={healthCheckRating}
                  onChange={handleChangeRating}
                >
                  <MenuItem value={0}>Healthy</MenuItem>
                  <MenuItem value={1}>LowRisk</MenuItem>
                  <MenuItem value={2}>HighRisk</MenuItem>
                  <MenuItem value={3}>CriticalRisk</MenuItem>
                </Select>
              </FormControl>
            )}
            {entryType === EntryType.OccupationalHealthcare && (
              <Stack spacing={2}>
                <TextField
                  label="Employer Name"
                  variant="standard"
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                />
                <Stack direction="row" spacing={2}>
                  <DatePicker
                    label="start"
                    value={slStartDate}
                    onChange={(newValue) => setSlStartDate(newValue)}
                  />
                  <DatePicker
                    label="end"
                    value={slEndDate}
                    onChange={(newValue) => setSlEndDate(newValue)}
                  />
                </Stack>
              </Stack>
            )}
            {entryType === EntryType.Hospital && (
              <Stack direction="row" spacing={2}>
                <DatePicker
                  label="Date"
                  value={disDate}
                  onChange={(newValue) => setDisDate(newValue)}
                />
                <TextField
                  label="Criteria"
                  variant="standard"
                  value={disCriteria}
                  onChange={({ target }) => setCriteria(target.value)}
                />
              </Stack>
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
    </LocalizationProvider>
  );
};

export default AddEntryForm;
