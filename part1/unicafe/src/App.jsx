import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value, tail}) => <tr><td>{text}</td><td>{value} {tail}</td></tr>

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad
  const average = (good - bad) / all 
  const positive = (good / all ) * 100

  if (all <= 0) return (
    <>
    <h1>statistics</h1>
    <p>No feedback given<br></br></p>
    </> 
  )

  return (
    <>
    <h1>statistics</h1>
    <table><tbody>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={all} />
    <StatisticLine text="average" value={average}/>
    <StatisticLine text="positive" value={positive} tail=' %'/>
    </tbody></table>
    </> 
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good'></Button>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'></Button>
      <Button onClick={() => setBad(bad + 1)} text='bad'></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
