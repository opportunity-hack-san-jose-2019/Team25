import React, { Component } from "react"

import Stats from "./Stats.component"

export default class StatsContainer extends Component {
	render = _ => <Stats {...this.props} />
}