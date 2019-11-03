import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./Student.scss"
import Header from "../../Header"

import StoreContext from "../../../context"

export default class Student extends Component {
    contextType = StoreContext
    render = _ => {
        const { student } = this.props
        const { courseId, profile } = student
        const { name } = profile
        const { fullName } = name

        return (
            <StoreContext.Consumer>
                {({ data }) => {
                    const course = data.courses.filter(x => x.id == courseId)[0]

                    return (
                        <Link className="plain" to={`/student/${profile.id}`}>
                            <div className="align-center direction-row student accent-strip">
                                <div className="student-picture"></div>
                                <div className="info">
                                    <Header small>{fullName}</Header>
                                    <span className="class-name">
                                        {course.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )
                }}
            </StoreContext.Consumer>
        )
    }
}
