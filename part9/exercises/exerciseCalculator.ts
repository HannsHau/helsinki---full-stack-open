type Rating = 1 | 2 | 3;

export interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseValue {
  hours: number[]
  target: number
}

const restValuesAreNum = (values: string[]) : boolean => {
  const result = values.reduce((acc, cur) => acc && !isNaN(Number(cur)) , true)
  return result
}

const parseArgumentsExercise = (args: string[]): ExerciseValue => {
  if (args.length < 4) throw new Error('Not enough arguments')

  if (!isNaN(Number(args[2])) && restValuesAreNum(args.slice(3))) {
    const hours = args.slice(3).map(v => Number(v))
    const target = Number(args[2])
    return {
      hours,
      target
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const getRating = (average: number, target: number): Rating => {
  if (average < target * 0.8) {
    return 3
  } // failed
  else if (average < target * 1.2) {
    return 2
  } // passed
  else {
    return 1
  } // excellent
}

const getRatingText = (rating: Rating): string => {
  switch (rating) {
    case 3:
      return 'failed, put more efford in'
    case 2:
      return 'not too bad but could be better'
    case 1:
      return 'excellent, you overarchived your target'
  }
}

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength: number = hours.length
  const trainingDays: number = hours.filter(h => h > 0).length
  const average: number =
    hours.reduce((acc, cur) => acc + cur, 0) / periodLength
  const success: boolean = average >= target
  const rating: Rating = getRating(average, target)
  const ratingDescription = getRatingText(rating)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

//console.log('calculateExercises with [3, 0, 2, 4.5, 0, 3, 1] and 2: ', calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
try {
  const { hours, target } = parseArgumentsExercise(process.argv)
  console.log(calculateExercises(hours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
