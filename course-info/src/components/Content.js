import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
    const partArray = [...course.parts]

    return (
        <div>
            {partArray.map(part =>
                <Part
                    key={part.id}
                    course={part} />)}
        </div>
    )
}

export default Content