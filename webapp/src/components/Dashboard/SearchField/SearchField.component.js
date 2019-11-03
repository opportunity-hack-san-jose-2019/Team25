import React, { Component } from "react"

import "./SearchField.scss"

export default class SearchField extends Component {
    render = _ => (
        <div className="justify-center search-field-wrapper">
            <input
                type="text"
                class="search-field"
                onChange={this.props.onChange}
                placeholder="Search for something..."
            />
        </div>
    )
}
