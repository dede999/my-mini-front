import React from "react"
import Home from "./pages/Home";
import NewList from "./pages/NewList";
import { BrowserRouter, Switch, Route } from "react-router-dom"

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/list/new' component={NewList} />
      </Switch>
    </BrowserRouter>
  )
}
