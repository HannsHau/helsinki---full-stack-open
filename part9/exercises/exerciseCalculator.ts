type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

const getRating = (average: number, target: number) : Rating => {
  if (average < target) {return 3} // failed
  else if (average < target * 1.2) { return 2} // passed
  else { return 1 } // excellent
}  

const getRatingText = (rating: Rating) : string => {
  switch (rating) {
    case 3:
      return 'not too bad but could be better'
    case 2:
      return 'passed, you achived your target'
    case 1:
      return 'excellent, you overarchived your target'
  }

}

const calculateExercises = (hours: number[], target: number) : Result => {

  const periodLength : number = hours.length;
  const trainingDays : number = hours.filter(h => h > 0).length;
  const average : number = hours.reduce((acc, cur) => acc + cur, 0) / periodLength;
  const success: boolean = average >= target;
  const rating: Rating = getRating(average, target);
  const ratingDescription = getRatingText(rating);

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

console.log('calculateExercises with [3, 0, 2, 4.5, 0, 3, 1] and 2: ', calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))