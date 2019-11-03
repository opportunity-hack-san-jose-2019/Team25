import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./Button.scss"

export default class Button extends Component {
    render = _ => (
        <div className="button-wrapper">
            <Link onClick={this.props.onClick || null} to={this.props.to}>
                <button class="button">{this.props.children}</button>
            </Link>
        </div>
    )
}
