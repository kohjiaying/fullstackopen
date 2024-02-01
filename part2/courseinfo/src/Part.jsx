const Part = ({part}) => {
  console.log('in Part', part)
  return (
    <p>
    {part.name} {part.exercises}
    </p>
  )
} 

export default Part