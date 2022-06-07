import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.send({ message: 'malformatted parameters' });
  } else {
    res.send({ height, weight, bmi: calculateBmi(height, weight) });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  let allNumber = true;
  if (!daily_exercises || !target) {
    return res.send({ error: 'parameters missing' }).status(400);
  }
  if (!Array.isArray(daily_exercises)) {
    return res.send({ error: 'malformatted parameters' }).status(400);
  } else {
    for (let i = 0; i < daily_exercises.length; i++) {
      if (typeof daily_exercises[i] !== 'number') {
        allNumber = false;
      }
    }
  }

  if (isNaN(Number(target)) || allNumber) {
    return res.send({ error: 'parameters missing' }).status(400);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, Number(target));
  return res.send(result);
});
const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
