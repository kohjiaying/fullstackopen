import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.headerName}
      </h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handling}>{props.buttonName}</button>
  )
}

const StatisticLine = (props) => {
  if (props.statFeedback === 'positive') {
    return (
      <tr>
        <td>
          {props.statFeedback}
        </td>
        <td>
          {props.feedbackNum} %
        </td>
      </tr>
    )
  }
  else {
    return (
      <tr>
        <td>
          {props.statFeedback}
        </td>
        <td>
          {props.feedbackNum} 
        </td>
      </tr>
    )
  }  
}

const StatisticBoard = (props) => {

  const averageScore = (props.good*1 + props.neutral*0 + props.bad*-1)/props.total
  const positivePercentage = (props.good/props.total)*100

  if (props.total != 0){
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine statFeedback='good' feedbackNum={props.good} />
            <StatisticLine statFeedback='neutral' feedbackNum={props.neutral} />
            <StatisticLine statFeedback='bad' feedbackNum={props.bad} />
            <StatisticLine statFeedback='all' feedbackNum={props.total} />
            <StatisticLine statFeedback='average' feedbackNum={averageScore} />
            <StatisticLine statFeedback='positive' feedbackNum={positivePercentage} />
          </tbody>
        </table>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>
          No feedback given.
        </p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const feedbackName = 'give feedback'
  const statisticsName = 'statistics'

  const handleGoodClick = () => {
    console.log('clicked the good button')
    setAll(allClicks.concat('G'))
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad) 
  }

  const handleNeutralClick = () => {
    console.log('clicked the neutral button')
    setAll(allClicks.concat('N'))
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad) 
  }

  const handleBadClick = () => {
    console.log('clicked the bad button')
    setAll(allClicks.concat('B'))
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + neutral + good) 
  }

  return (
    <div>
      <Header headerName={feedbackName} />
      <Button handling={handleGoodClick} buttonName='good' />
      <Button handling={handleNeutralClick} buttonName='neutral' />
      <Button handling={handleBadClick} buttonName='bad' />
      <Header headerName={statisticsName} />
      <StatisticBoard total={total} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
