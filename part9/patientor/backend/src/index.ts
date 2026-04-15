import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "vscode-restclient://",
    ],
    credentials: true,
  }),
);

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", cors(), diagnosisRouter);
app.use("/api/patients", cors(), patientRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
