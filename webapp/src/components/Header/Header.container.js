import React, { Component } from "react"

import Header from "./Header.component"

export default class HeaderContainer extends Component {
	render = _ => <Header {...this.props} />
}