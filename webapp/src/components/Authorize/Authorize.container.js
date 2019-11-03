import React, { Component } from "react"

import Authorize from "./Authorize.component"

export default class AuthorizeContainer extends Component {
	render = _ => <Authorize {...this.props} />
}