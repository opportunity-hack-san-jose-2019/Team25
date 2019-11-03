import React, { Component } from "react"

import "./ListContainer.scss"

export default class ListContainer extends Component {
    render = _ => (
        <div className="justify-center list-outer">
            <div
                className={`justify-center list-container ${
                    this.props.vertical
                        ? "vertical direction-column align-center"
                        : ""
                } ${
                    this.props.grid ? "grid direction-column align-center" : ""
                } ${
                    !(this.props.vertical || this.props.grid)
                        ? "horizontal direction-row"
                        : ""
                }`}
            >
                {React.Children.toArray(this.props.children).map((item, i) => (
                    <div key={i} className="list-item">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}
