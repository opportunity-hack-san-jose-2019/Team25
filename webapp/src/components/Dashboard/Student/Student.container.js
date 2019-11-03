import React, { Component } from "react"

import Student from "./Student.component"

export default class StudentContainer extends Component {
    render = _ => <Student {...this.props} />
}
