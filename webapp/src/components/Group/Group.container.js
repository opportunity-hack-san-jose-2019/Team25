import React, { Component } from "react"

import Group from "./Group.component"

export default class GroupContainer extends Component {
	render = _ => <Group {...this.props} />
}