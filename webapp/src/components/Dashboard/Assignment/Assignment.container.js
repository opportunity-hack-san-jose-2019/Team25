import React, { Component } from "react"

import Assignment from "./Assignment.component"

export default class AssignmentContainer extends Component {
	render = _ => <Assignment {...this.props} />
}