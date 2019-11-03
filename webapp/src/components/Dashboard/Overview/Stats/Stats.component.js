import React, { Component } from "react"

import StateContext from "../../../../context"

import "./Stats.scss"
import Header from "../../../Header"
import Group from "../../../Group/Group.component"

export default class Stats extends Component {
    contextType = StateContext
    render = _ => (
        <StateContext.Consumer>
            {({ data }) => (
                <div className="justify-center stats-wrapper">
                    <Group>
                        <Header center>Some stats</Header>
                        <span className="text-small-caps">
                            {data ? data.students.length : "A lot of"} students
                        </span>
                        <span className="text-small-caps">
                            {data ? data.courses.length : "A lot of"} classes
                        </span>
                    </Group>
                </div>
            )}
        </StateContext.Consumer>
    )
}
