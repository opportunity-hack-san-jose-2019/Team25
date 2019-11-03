import React, { Component } from "react"

import Overview from "./Overview.component"

export default class OverviewContainer extends Component {
	render = _ => <Overview {...this.props} />
}