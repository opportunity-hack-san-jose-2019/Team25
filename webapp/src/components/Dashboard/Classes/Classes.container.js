import React, { Component } from "react"

import Classes from "./Classes.component"

export default class ClassesContainer extends Component {
    render = _ => <Classes {...this.props} />
}
