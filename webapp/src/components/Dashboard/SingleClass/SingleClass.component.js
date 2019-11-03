import React, { Component } from "react"
import { Redirect } from "react-router-dom"

import "./SingleClass.scss"

import StoreContext from "../../../context"
import Container from "../../Container"
import Header from "../../Header"
import Group from "../../Group/Group.component"
import ListContainer from "../../ListContainer/ListContainer.component"
import Submission from "../Submission"
import Student from "../Student"
import Assignment from "../Assignment/Assignment.component"
import UnlinkedButton from "../../UnlinkedButton"

export default class SingleClass extends Component {
    contextType = StoreContext
    state = {
        assignmentsOpen: true,
        studentsOpen: true,
    }
    toggleAssignments = _ =>
        this.setState({ assignmentsOpen: !this.state.assignmentsOpen })
    toggleStudents = _ =>
        this.setState({ studentsOpen: !this.state.studentsOpen })
    render = _ => (
        <StoreContext.Consumer>
            {({ data }) => {
                if (!data)
                    return (
                        <Header medium center>
                            Loading...
                        </Header>
                    )
                const course = data.courses.filter(
                    x => x.id == this.props.match.params.id
                )[0]
                if (!course) return <Redirect to="/" />
                const students =
                    data.students.filter(x => x.courseId == course.id) || []
                const assignments = data.courseWork[course.id] || []

                return (
                    <div className="single-class">
                        <Container>
                            <Group>
                                <span className="text-small-caps">
                                    {students.length || 0} students • 
                                    {assignments.length || 0} assignments
                                </span>
                                <Header center medium>
                                    {course.name}
                                </Header>
                            </Group>
                        </Container>
                        <Container>
                            <Group paddingBetween={16}>
                                <Header medium center>
                                    Assignments
                                    <UnlinkedButton
                                        onClick={this.toggleAssignments}
                                    >
                                        {this.state.assignmentsOpen
                                            ? "Close"
                                            : "Open"}
                                    </UnlinkedButton>
                                </Header>
                                <ListContainer vertical>
                                    {!this.state.assignmentsOpen ||
                                        assignments.map(item => (
                                            <Assignment assignment={item} />
                                        ))}
                                </ListContainer>
                            </Group>
                        </Container>
                        <Container>
                            <Group paddingBetween={16}>
                                <Header medium center>
                                    Students
                                    <UnlinkedButton
                                        onClick={this.toggleStudents}
                                    >
                                        {this.state.studentsOpen
                                            ? "Close"
                                            : "Open"}
                                    </UnlinkedButton>
                                </Header>
                                <ListContainer vertical>
                                    {!this.state.studentsOpen ||
                                        students.map(item => (
                                            <Student student={item} />
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
