const Header = ({name}) => {
    return <h1>{name}</h1>
  }
const Part = ({ partName, partEx }) => {
  return (
    <p>
      {partName} {partEx}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} partName={part.name} partEx={part.exercises}/>)}
    </div>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><b>total of {totalExercises} exercises</b></p>
}

const Course = ({courses}) => {
  return (
    <>
    <h1>Web development curriculum</h1>
    {courses.map((course, i) => (
      <div key={i}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>

    ))}
    </>
  )
}
export default Course