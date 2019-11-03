import React, { Component } from "react"

import Students from "./Students.component"

export default class StudentsContainer extends Component {
    render = _ => <Students {...this.props} />
}
