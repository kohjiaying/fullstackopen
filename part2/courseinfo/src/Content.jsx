import Part from './Part'

const Content = ({parts}) => {
    console.log('content properties', parts)
    return (
    <div>
        {parts.map((part) => <Part key={part.id} part={part}/>)}
    </div>      
    )
}
 export default Content