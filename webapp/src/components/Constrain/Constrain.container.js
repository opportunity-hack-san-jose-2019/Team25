import React, { Component } from "react"

import Constrain from "./Constrain.component"

export default class ConstrainContainer extends Component {
	render = _ => <Constrain {...this.props} />
}