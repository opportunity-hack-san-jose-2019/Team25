import React, { Component } from "react"

import "./ClassWide.scss"
import Header from "../../Header/Header.component"

export default class ClassWide extends Component {
    render = _ => (
        <div className="align-center direction-row class-wide accent-strip">
            <div className="class-picture"></div>
            <Header center small>
                {this.props.name}
            </Header>
        </div>
    )
}
