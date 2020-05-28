import React, { Component } from "react"
import ListBuilder from "../../components/ListBuilder"
import PageWithNavBar from "../../templates/PageWithNavBar"

export default class NewList extends Component<any, any> {

  render() {
    const { match: { params } } = this.props

    return (
      <PageWithNavBar>
        <ListBuilder 
          id={params.list_id} 
          history={this.props.history} />
      </PageWithNavBar>
    )
  }
}