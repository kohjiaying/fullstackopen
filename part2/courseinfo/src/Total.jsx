const Total = ({parts}) => {
    console.log('in Total', parts)
    const sum = parts.reduce((total, obj) => obj.exercises + total,0)
    return (
        <p>total of {sum} exercises</p>
    )
  } 
  
  export default Total