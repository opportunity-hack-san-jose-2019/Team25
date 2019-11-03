import React, { Component } from "react"

import "./Students.scss"

import StoreContext from "../../../context"
import ListContainer from "../../ListContainer"
import Group from "../../Group"
import Header from "../../Header"
import Container from "../../Container"
import SearchField from "../SearchField"
import Student from "../Student"

export default class Students extends Component {
    state = {
        searchString: "",
    }
    onChange = e => this.setState({ searchString: e.target.value })
    sortStudents = (cw, search) => {
        const assignments = []
        cw.forEach(item => assignments.push(item))
        console.log(assignments)
        if (search == "") return assignments
        return assignments
            .filter(
                x =>
                    x.profile.name.fullName
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) != -1
            )
            .sort((a, b) => {
                return (
                    b.profile.name.fullName
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) -
                    a.profile.name.fullName
                        .toLowerCase()
                        .indexOf(search.toLowerCase())
                )
            })
    }
    render = _ => (
        <StoreContext.Consumer>
            {({ data = [] }) => {
                let students = null
                if (data && data.students)
                    students = this.sortStudents(
                        data.students,
                        this.state.searchString
                    )

                return (
                    <div class="students">
                        <Container>
                            <Group paddingBetween={16}>
                                <Header center>Students</Header>
                                <SearchField onChange={this.onChange} />
                                <ListContainer vertical>
                                    {students
                                        ? students.map(item => (
                                              <Student student={item} />
                                          ))
                                        : "Loading..."}
                                </ListContainer>
                            </Group>
                        </Container>
                    </div>
                )
            }}
        </StoreContext.Consumer>
    )
}
