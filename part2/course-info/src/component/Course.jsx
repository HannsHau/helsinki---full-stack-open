const Header = ({course}) => <h2>{course}</h2>

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({parts}) => (  
  <div>
    {parts.map((part) => 
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Total = (props) => <p><b>total of {props.total} exercises</b></p>

const Course = ({course: {name, parts} }) => {
  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total
        total={
          parts.reduce((sum, {exercises}) => sum + exercises, 0)
        }
      />
    </>
  )
}

export default Course