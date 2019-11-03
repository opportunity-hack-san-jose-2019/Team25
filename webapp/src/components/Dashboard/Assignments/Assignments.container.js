import React, { Component } from "react"

import Assignments from "./Assignments.component"

export default class AssignmentsContainer extends Component {
	render = _ => <Assignments {...this.props} />
}