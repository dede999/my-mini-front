import React, {Component} from "react"
import "./styles.sass"

interface List {
  id: number,
  title: string,
  is_private: boolean,
  description: string,
  [etc: string]: any
}

interface Props {
  lists: List[],
  title: string
}

export default class ShowLists extends Component<Props, any>{

  render() {
    const { lists, title } = this.props

    return (
      <div className="show-lists">
        <h1 className="divider line glow"> { title } </h1>
        <div className="container">
          { lists.map((list: List) => <p> { list.title } </p>) }
        </div>
      </div>
    )
  }
}
