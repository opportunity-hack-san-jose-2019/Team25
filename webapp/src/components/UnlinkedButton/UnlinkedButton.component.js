import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./UnlinkedButton.scss"

export default class UnlinkedButton extends Component {
    render = _ => (
        <div className="button-wrapper">
            <a
                onClick={e => {
                    e.preventDefault()
                    this.props.onClick()
                }}
                href="#"
            >
                <button class="button">{this.props.children}</button>
            </a>
        </div>
    )
}
