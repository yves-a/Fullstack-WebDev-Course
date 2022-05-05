
const Header = (props) => {

    return (
      <h1>{props.name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part}/>
          )}
      </div>
      
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises} {part.id}</p>
    )
  }
  
  
  const Sum = ({parts}) => {
    
    const array1 = {parts}.parts
    const total = array1.reduce((sum,part)=> sum+part.exercises,0)
    return (
      <p><b>total of {total} exercises</b></p>
    )
  }
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Sum parts={course.parts}/>
      </div>
      
    )
  }

export default Course