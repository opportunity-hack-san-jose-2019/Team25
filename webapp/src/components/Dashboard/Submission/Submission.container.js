import React, { Component } from "react"

import Submission from "./Submission.component"

export default class SubmissionContainer extends Component {
    render = _ => <Submission {...this.props} />
}
