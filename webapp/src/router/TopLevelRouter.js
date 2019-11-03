import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"

import Dashboard from "../components/Dashboard"
import Authorize from "../components/Authorize"

import StoreContext from "../context"

export default class TopLevelRouter extends Component {
    state = {
        loaded: false,
        data: null,
    }
    fetchData = async _ => {
        let json
        try {
            const request = await fetch("http://localhost:6060")
            json = await request.json()
        } catch (e) {
            alert(e)
        }

        this.setState({ data: json })
        console.log(json)
    }
    componentDidMount = _ => this.fetchData()
    render = _ => (
        <StoreContext.Provider value={this.state}>
            <Switch>
                <Route exact path="/login">
                    <Authorize />
                </Route>
                <Route path="/">
                    <Dashboard />
                </Route>
            </Switch>
        </StoreContext.Provider>
    )
}
