import { useState } from 'react'

const Statistics = (props) => {
  console.log(props)

  if (props.stats[3]==0){
    return (
      <div>
      <h1>
        statistics
      </h1>
      No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>
        statistics
      </h1>
      <table>
        <tbody>
        <StatisticLine text="good" value = {props.stats[0]}/>
        <StatisticLine text="neutral" value = {props.stats[1]}/>
        <StatisticLine text="bad" value = {props.stats[2]}/>
        <StatisticLine text="all" value = {props.stats[3]}/>
        <StatisticLine text="average" value = {(props.stats[0] - props.stats[1]) / (props.stats[3])}/>
        <StatisticLine text="positive" value = {props.stats[0] / (props.stats[3]) * 100} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  if (props.text=="positive"){
    return (
    <tr>
      <td>{props.text}</td>
      <td> {props.value}% </td>
    </tr>
    )
      
  }
  
  return (
    <tr>
      <td>{props.text}</td> 
      <td> {props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good+1)
  const increaseNeutral = () => setNeutral(neutral+1)
  const increaseBad = () => setBad(bad+1)
  let totalArray = [good,neutral,bad,good+neutral+bad]
  return (
    <div>
      <h1>
        give feedback
      </h1>
      
      <button onClick={increaseGood}>
        good
      </button>
      <button onClick={increaseNeutral}>
        neutral
      </button>
      <button onClick={increaseBad}>
        bad
      </button>
      <Statistics stats={totalArray}/>
    </div>
    
  )
}

export default App