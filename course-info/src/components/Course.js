import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    return (
        <React.Fragment>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </React.Fragment>
    )
}

export default Course