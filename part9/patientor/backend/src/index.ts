import express from "express";
// import cors from "cors";
import diagnosisRouter from './routes/diagnoses';

const app = express();

console.log('Hi');

app.use(express.json());

console.log('Hi2');

// app.use(cors as express.RequestHandler);

console.log('Hi3');

const PORT = 3001;

console.log('Hi4');

app.get('/api/ping', (_req, res) => {
  console.log('Hi');
  console.log("someone pinged here");
  res.send("pong");
});

app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
