import React from "react"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import NewList from "./pages/NewList"
import { is_logged } from "./service/headers_handler"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

export default function Routes () {
  if (is_logged()) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/list/new' component={NewList} />
        </Switch>
      </BrowserRouter>
    )
  }
  else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={SignUp} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    )
  }
}
