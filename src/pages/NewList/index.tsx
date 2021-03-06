import React, { Component } from "react"
import ListBuilder from "../../components/ListBuilder"
import PageWithNavBar from "../../templates/PageWithNavBar"

export default class NewList extends Component<any, any> {

  render() {
    return (
      <PageWithNavBar>
        <ListBuilder />
      </PageWithNavBar>
    )
  }
}