import React, { Component } from "react"

import "./Header.scss"

export default class Header extends Component {
    render = _ => (
        <h1
            {...this.props}
            className={`header-standard serif ${
                this.props.center ? "text-center" : ""
            } ${this.props.medium ? "medium" : ""} ${
                this.props.small ? "small" : ""
            }`}
        >
            {this.props.children}
        </h1>
    )
}
