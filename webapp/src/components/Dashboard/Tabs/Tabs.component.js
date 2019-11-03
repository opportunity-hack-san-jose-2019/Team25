import React, { Component } from "react"

import "./Tabs.scss"

export default class Tabs extends Component {
    render = _ => (
        <div class="tabs direction-row">
            {this.props.children.map((item, i) =>
                React.cloneElement(item, {
                    selected: this.props.selected == i,
                })
            )}
        </div>
    )
}
