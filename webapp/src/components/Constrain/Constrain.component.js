import React, { Component, Fragment } from "react"

import "./Constrain.scss"

export default class Constrain extends Component {
    render = _ => (
        <Fragment>
            {React.Children.toArray(this.props.children).slice(
                0,
                this.props.number
            )}
        </Fragment>
    )
}
