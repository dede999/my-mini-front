import React, {Component, ReactNode} from "react"
import NavBar from "../../components/NavBar";

interface IProps {
  children?: ReactNode
}

export default class PageWithNavBar extends Component<IProps, any>{
  render() {
    const { children } = this.props

    return (
      <>
       <NavBar/>
        { children }
      </>
    );
  }
}
