import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./Tab.scss"

export default class Tab extends Component {
    render = _ => (
        <Link className="link" to={this.props.to}>
            <div className={`tab ${this.props.selected ? "active" : ""}`}>
                {this.props.children}
                <div className="indicator-wrapper">
                    <div className="indicator"></div>
                </div>
            </div>
        </Link>
    )
}
