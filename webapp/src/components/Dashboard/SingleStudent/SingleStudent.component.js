import React, { Component } from "react"
import { Redirect } from "react-router-dom"

import "./SingleStudent.scss"

import StoreContext from "../../../context"
import Container from "../../Container"
import Header from "../../Header"
import Group from "../../Group/Group.component"
import ListContainer from "../../ListContainer/ListContainer.component"
import Submission from "../Submission"
import Student from "../Student"
import Assignment from "../Assignment/Assignment.component"
import UnlinkedButton from "../../UnlinkedButton"
import Class from "../Class/Class.component"

export default class SingleStudent extends Component {
    contextType = StoreContext
    render = _ => (
        <StoreContext.Consumer>
            {({ data }) => {
                if (!data)
                    return (
                        <Header medium center>
                            Loading...
                        </Header>
                    )

                const user = data.students.filter(
                    x => x.userId == this.props.match.params.id
                )[0]
                if (!user) return <Redirect to="/" />

                const courses = [
                    data.courses.filter(x => x.id == user.courseId)[0],
                ]

                return (
                    <div className="single-student">
                        <Container>
                            <Group>
                                <span className="text-small-caps">Student</span>
                                <Header medium center>
                                    {user.profile.name.fullName}
                                </Header>
                            </Group>
                        </Container>
                        <Container>
                            <Group>
                                <Header medium center>
                                    Classes
                                </Header>
                                <ListContainer vertical>
                                    {courses.map(item => (
                                        <Class name={item.name} id={item.id} />
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
