import React, { Component } from "react"

import Button from "./Button.component"

export default class ButtonContainer extends Component {
	render = _ => <Button {...this.props} />
}