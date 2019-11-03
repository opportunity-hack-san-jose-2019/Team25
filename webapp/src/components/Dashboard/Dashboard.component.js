import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import "./Dashboard.scss"
import Header from "../Header"
import Container from "../Container"
import Tabs from "./Tabs"
import Tab from "./Tabs/Tab"

import Overview from "./Overview"
import Assignments from "./Assignments"
import Students from "./Students"
import Classes from "./Classes"
import SingleAssignment from "./SingleAssignment"
import SingleClass from "./SingleClass"
import SingleStudent from "./SingleStudent"

const routerTable = [
    {
        name: "Overview",
        path: "/",
    },
    {
        name: "Assignments",
        path: "/assignments",
    },
    {
        name: "Students",
        path: "/students",
    },
    {
        name: "Classes",
        path: "/classes",
    },
]

export default class Dashboard extends Component {
    // selectedIndex returns the index of the currently selected tab (link).
    selectedIndex = () =>
        [...routerTable.keys()].filter(
            x => routerTable[x].path == this.props.location.pathname
        ) || 0
    render = _ => (
        <div className="dashboard accent-strip">
            <Container>
                <div className="justify-center">
                    <Tabs selected={this.selectedIndex()}>
                        {routerTable.map((item, i) => (
                            <Tab to={item.path}>{item.name}</Tab>
                        ))}
                    </Tabs>
                </div>
            </Container>
            <TransitionGroup className="transition">
                <CSSTransition
                    key={this.props.location.key}
                    classNames="fade"
                    timeout={400}
                >
                    <Switch location={this.props.location}>
                        <Route exact path="/classes">
                            <Classes />
                        </Route>
                        <Route exact path="/students">
                            <Students />
                        </Route>
                        <Route exact path="/student/:id">
                            <SingleStudent />
                        </Route>
                        <Route exact path="/class/:id">
                            <SingleClass />
                        </Route>
                        <Route exact path="/assignment/:id">
                            <SingleAssignment />
                        </Route>
                        <Route exact path="/assignments">
                            <Assignments />
                        </Route>
                        <Route exact path="/">
                            <Overview />
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}
