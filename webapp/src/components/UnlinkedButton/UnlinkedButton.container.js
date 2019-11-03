import React, { Component } from "react"

import UnlinkedButton from "./UnlinkedButton.component"

export default class UnlinkedButtonContainer extends Component {
    render = _ => <UnlinkedButton {...this.props} />
}
