import React, { Component } from "react"

import "./Overview.scss"
import Container from "../../Container"
import Header from "../../Header"
import Button from "../../Button"
import Group from "../../Group"
import Constrain from "../../Constrain"
import ListContainer from "../../ListContainer"
import Stats from "./Stats"
import Class from "../Class"
import Assignment from "../Assignment"

import StoreContext from "../../../context"

export default class Overview extends Component {
    contextType = StoreContext
    render = _ => {
        console.log(this.context)
        return (
            <StoreContext.Consumer>
                {({ data = [] }) => (
                    <div class="overview">
                        <Container>
                            <Group paddingBetween={16}>
                                <Header center>My classes</Header>
                                <ListContainer>
                                    {data
                                        ? data.courses.map(item => (
                                              <Class
                                                  id={item.id}
                                                  name={item.name}
                                              />
                                          ))
                                        : "Loading..."}
                                </ListContainer>
                            </Group>
                        </Container>
                        <Container>
                            <Group paddingBetween={16}>
                                <Header center>Latest assignments</Header>
                                <ListContainer vertical>
                                    <Constrain number={5}>
                                        {data
                                            ? Object.keys(data.courseWork).map(
                                                  item =>
                                                      data.courseWork[item].map(
                                                          item => (
                                                              <Assignment
                                                                  assignment={
                                                                      item
                                                                  }
                                                                  name={
                                                                      item.title
                                                                  }
                                                              />
                                                          )
                                                      )
                                              )
                                            : "Loading..."}
                                    </Constrain>
                                </ListContainer>
                                <div className="justify-center">
                                    <Button to="/assignments">
                                        See all assignments
                                    </Button>
                                </div>
                            </Group>
                        </Container>
                        <Container>
                            <Stats />
                        </Container>
                    </div>
                )}
            </StoreContext.Consumer>
        )
    }
}
