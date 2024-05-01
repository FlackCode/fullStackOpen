import { useState } from "react"
const Button = ({action, text }) => <button className="p-2 font-bold border-gray-200 border-2 mr-2 rounded-xl" onClick={action}>{text}</button>
const Buttons = ({ goodAction, neutralAction, badAction }) => {
  return (
    <div>
      <Button text={'good'} action={goodAction}/>
      <Button text={'neutral'} action={neutralAction}/>
      <Button text={'bad'} action={badAction}/>
    </div>
  )
}
const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if( total == 0 ){
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        {total > 0 && (
          <>
            <StatisticLine text="average" value={average.toFixed(2)}/>
            <StatisticLine text="positive" value={`${positive.toFixed(2)} %`}/>
          </>
        )}
      </tbody>
    </table>
  )
}
const StatisticLine = ({ text, value }) => <tr><td>{text} </td><td>{value}</td></tr>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good * 100) / total
  return (
    <div className="p-8">
      <h1 className="font-bold text-xl">give feedback</h1>
      <Buttons goodAction={() => setGood(good+1)} neutralAction={() => setNeutral(neutral+1)} badAction={() => setBad(bad+1)}/>
      <h1 className="font-bold text-xl">statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}
export default App;