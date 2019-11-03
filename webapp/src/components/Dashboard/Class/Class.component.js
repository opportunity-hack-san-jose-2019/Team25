import React, { Component } from "react"
import { Link } from "react-router-dom"

import "./Class.scss"
import Header from "../../Header/Header.component"

export default class Class extends Component {
    render = _ => (
        <Link className="plain" to={`/class/${this.props.id}`}>
            <div className="align-center direction-column class accent-strip">
                <div className="class-picture"></div>
                <Header center small>
                    {this.props.name}
                </Header>
            </div>
        </Link>
    )
}
