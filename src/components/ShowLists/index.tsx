import React, {Component} from "react"

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
      <div>
        <h2> { title } </h2>
        { lists.map((list: List) => <p> { list.title } </p>) }
      </div>
    )
  }
}
