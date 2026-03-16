const calculateBmi = (height: Number, weight: Number ) : String => {

  const bmi = Number(weight) / (Number(height)/100 * Number(height)/100)

  console.log('bmi: ', bmi)

  if (bmi < 18.5) return 'Underweight'
  if (bmi >= 18.5 && bmi < 25) return 'Normal Range'
  if (bmi >= 25 && bmi <= 30) return 'Overweight'
  if (bmi >= 30) return 'Obese'
}


console.log(calculateBmi(177, 78))