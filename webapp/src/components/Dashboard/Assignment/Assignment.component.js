import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./Assignment.scss"
import Header from "../../Header"

import StoreContext from "../../../context"

export default class Assignment extends Component {
    contextType = StoreContext
    render = _ => {
        const { assignment } = this.props
        const { dueDate, dueTime, courseId } = assignment

        return (
            <StoreContext.Consumer>
                {({ data }) => {
                    const course = data.courses.filter(x => x.id == courseId)[0]

                    return (
                        <Link
                            className="plain"
                            to={`/assignment/${assignment.id}`}
                        >
                            <div className="align-center direction-row assignment accent-strip">
                                <div className="assignment-picture"></div>
                                <div className="info">
                                    <Header small>{this.props.name}</Header>
                                    <span className="class-name">
                                        {course.name}
                                    </span>
                                    {!(dueDate || dueTime) || (
                                        <span className="due-date">
                                            Due {dueDate.month}/{dueDate.day}/
                                            {dueDate.year} at {dueTime.hours}:
                                            {dueTime.minutes || "00"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    )
                }}
            </StoreContext.Consumer>
        )
    }
}
