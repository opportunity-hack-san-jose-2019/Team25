import React, { Component } from "react"

import "./Group.scss"

export default class Group extends Component {
    render = _ => (
        <div
            class="padding-group"
            style={{
                paddingTop: this.props.padding || 8,
                paddingBottom: this.props.padding || 8,
            }}
        >
            {this.props.children.map(item =>
                React.cloneElement(item, {
                    style: {
                        paddingTop: this.props.paddingBetween || 4,
                        paddingBottom: this.props.paddingBetween || 4,
                    },
                })
            )}
        </div>
    )
}
