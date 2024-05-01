const Header = (props) => {
  //console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <>
    <p>{props.part} {props.content}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
    <Part part={props.part1} content={props.content1}/>
    <Part part={props.part2} content={props.content2}/>
    <Part part={props.part3} content={props.content3}/>

    </>
  )
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>
  )
}
//1.1-1.2 version
//const App = () => {
//  const course = 'Half Stack application development'
//  const part1 = 'Fundamentals of React'
//  const exercises1 = 10
//  const part2 = 'Using props to pass data'
//  const exercises2 = 7
//  const part3 = 'State of a component'
//  const exercises3 = 14
//
//  return (
//    <div>
//      <Header course={course}/>
//      <Content part1={part1} part2={part2} part3={part3} content1={exercises1} content2={exercises2} content3={exercises3}/>
//      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
//    </div>
//  )
//}
//1.3-1.5 version
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content part1={course.parts[0].name} part2={course.parts[1].name} part3={course.parts[2].name} content1={course.parts[0].exercises} content2={course.parts[1].exercises} content3={course.parts[2].exercises}/>
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises}/>
    </div>
  )
}

import { useState } from 'react'

//const App = () => {
//  const [ counter, setCounter ] = useState(0)
//
//  return (
//    <div className='p-6'>
//    <Display counter={counter}/>
//    <Button onClick={() => setCounter(counter+1)} text={'Plus'}/>
//    <Button onClick={() => setCounter(0)} text={'Reset'}/>
//    <Button onClick={() => setCounter(counter-1)} text={'Minus'}/>
//    </div>
//  )
//}
//
//const Display = ({ counter }) => <div>{counter}</div>
//
//const Button = ({ onClick, text }) => <button className='border-2 p-2' onClick={onClick}>{text}</button>

//const History = (props) => {
//  if (props.allClicks.length === 0) {
//    return (
//      <div>
//        The app is used by pressing the buttons
//      </div>
//    )
//  }
//  return (
//    <div>
//      Button press history: {props.allClicks.join(' ')}
//    </div>
//  )
//}
//
//const Button = ({ onClick, text }) => <button className='border-2 p-2' onClick={onClick}>{text}</button>
//
//const App = () => {
//  const [clicks, setClicks] = useState({
//    left: 0, right: 0,
//  })
//  const [allClicks, setAll] = useState([])
//  const [total, setTotal] = useState(0)
//
//  const handleLeftClick = () => {
//    setAll(allClicks.concat('L'))
//    setClicks({...clicks, left: clicks.left + 1,})
//    const updatedLeft = clicks.left + 1
//    setTotal(updatedLeft + clicks.right)
//  }
//
//  const handleRightClick = () => {
//    setAll(allClicks.concat('R'))
//    setClicks({...clicks, right: clicks.right + 1,})
//    const updatedRight = clicks.right + 1
//    setTotal(clicks.left + updatedRight)
//  }
//
//  return (
//    <div>
//      {clicks.left}
//      <Button onClick={handleLeftClick} text={'Left'}/>
//      <Button onClick={handleRightClick} text={'Right'}/>
//      {clicks.right}
//      <History allClicks={allClicks} />
//      <p>Total: {total}</p>
//    </div>
//  )
//}

export default App