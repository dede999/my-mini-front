import React, { Component } from "react"
import { ListItem, ListItemText } from "@material-ui/core"
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone'

interface IProp {
  id?: number
  draft?: boolean
  list_id?: number
  task_title?: string
  is_editable?: boolean
  onDelete: (task: string) => void
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
        <ListItemText className="task">
          { this.state.title }
        </ListItemText>
        <div className="actions">
          <div className="button" 
            onClick={() => this.props.onDelete(this.state.title)} >
            <RemoveCircleTwoToneIcon />
          </div>
        </div>
      </ListItem>
    )
  }
}