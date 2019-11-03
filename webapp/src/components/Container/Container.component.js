import React, { Component } from "react"

import "./Container.scss"

export default class Container extends Component {
    render = _ => (
        <div class={`container section ${this.props.className}`}>
            {this.props.children}
        </div>
    )
}
