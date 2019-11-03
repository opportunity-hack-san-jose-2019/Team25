import React, { Component } from "react"

import ListContainer from "./ListContainer.component"

export default class ListContainerContainer extends Component {
	render = _ => <ListContainer {...this.props} />
}