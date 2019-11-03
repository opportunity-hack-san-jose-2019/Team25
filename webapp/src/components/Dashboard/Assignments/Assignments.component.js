import React, { Component } from "react"

import "./Assignments.scss"

import StoreContext from "../../../context"
import Assignment from "../Assignment"
import ListContainer from "../../ListContainer"
import Group from "../../Group"
import Header from "../../Header"
import Container from "../../Container"
import SearchField from "../SearchField"

export default class Assignments extends Component {
    state = {
        searchString: "",
    }
    onChange = e => this.setState({ searchString: e.target.value })
    sortAssignments = (cw, search) => {
        const assignments = []
        Object.keys(cw).forEach(item => assignments.push(...cw[item]))
        console.log(assignments)
        if (search == "") return assignments
        return assignments
            .filter(
                x => x.title.toLowerCase().indexOf(search.toLowerCase()) != -1
            )
            .sort((a, b) => {
                return (
                    b.title.toLowerCase().indexOf(search.toLowerCase()) -
                    a.title.toLowerCase().indexOf(search.toLowerCase())
                )
            })
    }
    render = _ => (
        <StoreContext.Consumer>
            {({ data = [] }) => {
                let assignments = null
                if (data && data.courseWork)
                    assignments = this.sortAssignments(
                        data.courseWork,
                        this.state.searchString
                    )

                return (
                    <div class="assignments">
                        <Container>
                            <Group paddingBetween={16}>
                                <Header center>Assignments</Header>
                                <SearchField onChange={this.onChange} />
                                <ListContainer vertical>
                                    {assignments
                                        ? assignments.map(item => (
                                              <Assignment
                                                  assignment={item}
                                                  name={item.title}
                                              />
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
