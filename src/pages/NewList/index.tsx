import "./style.sass"
import React, { Component } from "react"
import SaveIcon from "@material-ui/icons/Save"
import { InputBase, Button } from "@material-ui/core"

interface Task {
  title: string,
  is_complete: boolean
}

export default class NewList extends Component<any, any> {
  state = {
    list_title: "New List",
    list_description: "",
    list_is_private: false,
    list_tasks: [],
    task_title: "",
  }

  list_attr = () => {
    return {
      title: this.state.list_title,
      description: this.state.list_description,
      is_private: this.state.list_is_private,
      tasks_attributes: this.state.list_tasks
    }
  }

  add_task = () => {
    this.setState({
      list_tasks: [...this.state.list_tasks, {
        title: this.state.task_title,
        is_complete: false
      }]
    })
  }
  
  set_field = (e: any) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  switcher = (e: any, key: string, value: boolean = true) => {
    console.log(key)
    this.setState({
      [key] : value
    })
  }

  privacy_status = () => {
    return this.state.list_is_private ? "private" : "public"
  }

  render() {
    const { list_tasks } = this.state

    return (
      <div className="new_list">
        <h1 style={{ textAlign: "center" }}>
          <InputBase 
            defaultValue={this.state.list_title}
            name="list_title"
            className="MuiInputBase-input title"
            onChange={(e: any) => this.set_field(e)} />
        </h1>
        <form>
          <InputBase 
            defaultValue={this.state.list_description}
            name="list_description"
            placeholder="List Description"
            multiline={true}
            onChange={(e: any) => this.set_field(e)} />

          <Button 
            variant="outlined"
            onClick={(e: any) => this.switcher(e, "list_is_private", !this.state.list_is_private)} 
            className={this.privacy_status()}>
            { this.privacy_status() }
          </Button>

          <Button
            size="large"
            className="save_btn"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </form>

        <ul>
          {list_tasks.map((task: Task) => <li key={task.title}> {task.title} completed:
            {task.is_complete ? "Completo" : "Incompleto"} </li>)}
        </ul>

        <button onClick={this.add_task}> Add Tasks </button>

        <label htmlFor="task_title">
          Task Title
        </label>
        <input
          type="text" name="task_title" id="task_title"
          onChange={(e: any) => this.set_field(e)} />

      </div>
    )
  }
}
