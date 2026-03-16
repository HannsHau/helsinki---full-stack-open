import express from 'express';
import { restValuesAreNum, isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
    res.send({ error: 'malformatted parameters' });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  res.send(calculateBmi(height, weight));
});

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (target === undefined || target === null 
      || daily_exercises === undefined || daily_exercises === null) {
    res.send({ error: 'parameters missing' });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNotNumber(target) || !restValuesAreNum(daily_exercises)) {
    res.send({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
