import React, { Component } from "react"

import ClassWide from "./ClassWide.component"

export default class ClassWideContainer extends Component {
    render = _ => <ClassWide {...this.props} />
}
