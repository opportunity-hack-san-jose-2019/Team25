import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./Submission.scss"
import Header from "../../Header"

import StoreContext from "../../../context"

export default class Submission extends Component {
    contextType = StoreContext
    render = _ => {
        const { submission, assignment } = this.props
        const { item, student } = submission

        return (
            <StoreContext.Consumer>
                {({ data }) => {
                    return (
                        <Link className="plain" to={`/submission/${item.id}`}>
                            <div className="align-center direction-row submission accent-strip">
                                <div className="submission-picture"></div>
                                <div className="info">
                                    <Header small>
                                        {student.profile.name.fullName}
                                    </Header>
                                    <span
                                        className={`points ${
                                            item.late ? "late" : ""
                                        }`}
                                    >
                                        {item.state == "RETURNED"
                                            ? `${item.assignedGrade}/${
                                                  assignment.maxPoints
                                              } • ${new Date(
                                                  item.submissionHistory[
                                                      item.submissionHistory
                                                          .length - 1
                                                  ].gradeHistory.gradeTimestamp
                                              ).toDateString()}`
                                            : ""}
                                        {item.state == "TURNED_IN"
                                            ? `Turned in • ${new Date(
                                                  item.submissionHistory[
                                                      item.submissionHistory
                                                          .length - 1
                                                  ].gradeHistory.gradeTimestamp
                                              ).toDateString()}`
                                            : ""}
                                        {item.state == "CREATED" ||
                                        item.state == "NEW"
                                            ? `Not turned in`
                                            : ""}
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
