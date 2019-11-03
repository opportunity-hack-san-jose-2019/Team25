import React, { Component } from "react"
import { Redirect } from "react-router-dom"

import "./SingleAssignment.scss"

import StoreContext from "../../../context"
import Container from "../../Container"
import Header from "../../Header"
import Group from "../../Group/Group.component"
import ListContainer from "../../ListContainer/ListContainer.component"
import Submission from "../Submission/Submission.component"

export default class SingleAssignment extends Component {
    contextType = StoreContext
    render = _ => (
        <StoreContext.Consumer>
            {({ data }) => {
                if (!data)
                    return (
                        <Header center medium>
                            Loading
                        </Header>
                    )
                const allAssignments = []
                Object.keys(data.courseWork).forEach(i =>
                    allAssignments.push(...data.courseWork[i])
                )
                const assignment = allAssignments.filter(
                    x => x.id == this.props.match.params.id
                )[0]
                if (!assignment) return <Redirect to="/" />
                const course = data.courses.filter(
                    x => x.id == assignment.courseId
                )[0]
                if (!course) return <Redirect to="/" />
                let submissions = []
                Object.keys(data.studentWork).forEach(id => {
                    const work = data.studentWork[id]
                    work.forEach(item => {
                        if (item.courseWorkId !== assignment.id) return
                        let student = data.students.filter(student => {
                            return student.userId == id
                        })[0]
                        submissions.push({
                            item,
                            student,
                        })
                    })
                })

                let gradeMarks = []
                let grades = []
                submissions.forEach(item => {
                    console.log(item)
                    if (!item.item.assignedGrade) return
                    grades.push(item.item.assignedGrade)
                    gradeMarks.push(
                        (item.item.assignedGrade / assignment.maxPoints) * 300
                    )
                })

                let average = 0
                if (grades.length > 0)
                    average =
                        Math.floor(
                            (grades.reduce((a, b) => a + b, 0) /
                                grades.length) *
                                10
                        ) / 10

                return (
                    <div className="single-assignment">
                        <Container>
                            <Group>
                                <span className="text-small-caps">
                                    {assignment.maxPoints} points possible
                                </span>
                                <Header center medium>
                                    {assignment.title}
                                </Header>
                                <Header center small>
                                    {course.name}
                                </Header>
                            </Group>
                        </Container>
                        <Container>
                            <Group>
                                <Header small center>
                                    Grade spectrum
                                </Header>
                                <div className="align-center direction-column">
                                    <div className="grade-spectrum-canvas">
                                        {gradeMarks.map(item => (
                                            <div
                                                className="point"
                                                style={{
                                                    left: item - 4,
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="legend">
                                        <span className="left">0</span>
                                        <span className="right">
                                            {assignment.maxPoints}
                                        </span>
                                    </div>
                                    <div className="justify-center legend-center">
                                        <span className="italicized small">
                                            1 line represents 1 student's grade.
                                        </span>
                                    </div>
                                </div>
                            </Group>
                        </Container>
                        <Container>
                            <Group>
                                <Header small center>
                                    Grade statistics
                                </Header>
                                <span className="grade-stat">
                                    <b>Low:</b> {Math.min(...grades)} points
                                </span>
                                <span className="grade-stat">
                                    <b>Average:</b> {average} points
                                </span>
                                <span className="grade-stat">
                                    <b>High:</b> {Math.max(...grades)} points
                                </span>
                            </Group>
                        </Container>
                        <Container>
                            <Group>
                                <Header small center>
                                    Submission history
                                </Header>
                                <ListContainer vertical>
                                    {submissions.map(item => (
                                        <Submission
                                            submission={item}
                                            assignment={assignment}
                                        />
                                    ))}
                                </ListContainer>
                            </Group>
                        </Container>
                    </div>
                )
            }}
        </StoreContext.Consumer>
    )
}
