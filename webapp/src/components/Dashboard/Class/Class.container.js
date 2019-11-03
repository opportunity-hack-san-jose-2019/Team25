import React, { Component } from "react"

import Class from "./Class.component"

export default class ClassContainer extends Component {
	render = _ => <Class {...this.props} />
}