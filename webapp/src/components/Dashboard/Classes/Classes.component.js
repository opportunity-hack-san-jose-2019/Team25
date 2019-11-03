import React, { Component } from "react"

import "./Classes.scss"

import StoreContext from "../../../context"
import ListContainer from "../../ListContainer"
import Group from "../../Group"
import Header from "../../Header"
import Container from "../../Container"
import SearchField from "../SearchField"
import Class from "../Class"

export default class Classes extends Component {
    state = {
        searchString: "",
    }
    onChange = e => this.setState({ searchString: e.target.value })
    sortClasses = (cw, search) => {
        const assignments = []
        cw.forEach(item => assignments.push(item))
        console.log(assignments)
        if (search == "") return assignments
        return assignments
            .filter(
                x => x.name.toLowerCase().indexOf(search.toLowerCase()) != -1
            )
            .sort((a, b) => {
                return (
                    b.name.toLowerCase().indexOf(search.toLowerCase()) -
                    a.name.toLowerCase().indexOf(search.toLowerCase())
                )
            })
    }
    render = _ => (
        <StoreContext.Consumer>
            {({ data = [] }) => {
                let classes = null
                if (data && data.courses)
                    classes = this.sortClasses(
                        data.courses,
                        this.state.searchString
                    )

                return (
                    <div class="students">
                        <Container>
                            <Group paddingBetween={16}>
                                <Header center>Classes</Header>
                                <SearchField onChange={this.onChange} />
                                <ListContainer grid>
                                    {classes
                                        ? classes.map(item => (
                                              <Class
                                                  id={item.id}
                                                  name={item.name}
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
