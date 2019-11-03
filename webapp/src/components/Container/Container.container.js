import React, { Component } from "react"

import Container from "./Container.component"

export default class ContainerContainer extends Component {
	render = _ => <Container {...this.props} />
}