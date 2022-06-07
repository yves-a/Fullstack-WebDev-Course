interface ExceciseScore {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExcerciseValues {
  hours: Array<number>;
  target: number;
}
export const pasteArguments = (args: Array<string>): ExcerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hours: number[] = [];

  for (let i = 2; i < args.length - 1; i++) {
    if (!isNaN(Number(args[i]))) {
      hours.push(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers! hey');
    }
  }
  if (!isNaN(Number(args[args.length - 1]))) {
    return {
      hours,
      target: Number(args[args.length - 1]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
export const calculateExercises = (
  hours: Array<number>,
  target: number
): ExceciseScore => {
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average =
    hours.reduce((preValue, curValue) => preValue + curValue) / hours.length;
  let success, rating, ratingDescription;
  if (average >= target) {
    success = true;
    rating = 3;
    ratingDescription = 'great';
  } else if (average >= target - 0.1) {
    success = false;
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    success = false;
    rating = 1;
    ratingDescription = 'bad';
  }
  return {
    periodLength: hours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
try {
  const { hours, target } = pasteArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
