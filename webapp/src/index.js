import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

// import * as serviceWorker from "./serviceWorker"

// Global styles
import "./index.scss"

import TopLevelRouter from "./router/TopLevelRouter"

const appRoot = document.getElementById("root")

ReactDOM.render(
    <BrowserRouter>
        <TopLevelRouter />
    </BrowserRouter>,
    appRoot
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
