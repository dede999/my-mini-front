import React, {Component} from "react"
import Lists from "../../components/Lists"
import PageWithNavBar from "../../templates/PageWithNavBar"

export default class Home extends Component<any, any> {

  render() {
    return (
      <PageWithNavBar>
        <Lists/>
      </PageWithNavBar>
    )
  }
}
