const Header = (props) => {
  return (
    <h1> {props.name} </h1>
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
  var sum = 0;
  props.parts.forEach(value => {
    sum = sum + value.exercises
  })
  return (
    <p>Number of exercises {sum}</p>
  )
}

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
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Footer parts={course.parts} />
    </>
  )
}

export default App