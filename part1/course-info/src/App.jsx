const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  console.log(props)
      
  return (
    <div>
      {props.parts.map(value => <Part part={value.name} exercise={value.exercises} ></Part> )}
    </div>  
  )
}

const Footer = (props) => {
  var sum = 0
  props.parts.forEach(value => {
    sum = sum + value.exercises
  })
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Footer parts={parts} />
    </>
  )
}

export default App