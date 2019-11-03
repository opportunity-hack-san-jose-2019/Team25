import React, { Component } from "react"

import SearchField from "./SearchField.component"

export default class SearchFieldContainer extends Component {
	render = _ => <SearchField {...this.props} />
}