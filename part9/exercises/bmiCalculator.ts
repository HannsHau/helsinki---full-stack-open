interface BmiValue {
  height: number;
  weight: number;
}

interface ApiResult {
  height: number;
  weight: number;
  bmi: string;
}

const parseArguments = (args: string[]): BmiValue => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number ) : string | ApiResult => {

  //const bmi = Number(weight) / (Number(height)/100 * Number(height)/100)
  const bmi = weight / (height/100 * height/100);


  let bmiResult;
  if (bmi < 18.5) {
    bmiResult = 'Underweight'; 
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiResult='Normal Range';
  } else if (bmi >= 25 && bmi <= 30) {
    bmiResult='Overweight';
  } else {
    bmiResult='Obese';
  }

  if (require.main === module) {
    return bmiResult;
  } 

  return { height, weight, bmi: bmiResult};
};

//console.log(calculateBmi(177, 78))
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default "this is the default...";