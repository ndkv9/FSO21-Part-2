import React from 'react'

const Total = ({ course }) => {
    const exercises = course.parts.map(part => part.exercises)
    const sum = exercises.reduce((acc, curr) => acc + curr, 0)
    return (
        <h4><strong>Total of {sum} exercises</strong></h4>
    )
}

export default Total