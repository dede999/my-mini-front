import React, { Component } from "react"
import { ListItem, ListItemText } from "@material-ui/core"

interface IProp {
  id?: number
  draft?: boolean
  list_id?: number
  task_title?: string
  is_editable?: boolean
}

interface IState {
  title: string,
  sub_tasks?: []
}

export default class Task extends Component<IProp, IState> {
  
  state = {
    title: this.props.task_title || ""
  }

  render() {
    return (
      <ListItem>
        <ListItemText>
          { this.state.title }
        </ListItemText>
      </ListItem>
    )
  }
}