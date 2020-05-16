import "./style.sass"
import React, { Component } from "react"
import SaveIcon from "@material-ui/icons/Save"
import NavBar from "../../components/NavBar"
import List from "@material-ui/core/List"
import { ListSubheader, ListItem, ListItemText, InputBase, Divider, Button } from "@material-ui/core"
import Task from "../../components/Task"


interface ITask {
  title: string,
  is_complete: boolean
}

export default class NewList extends Component<any, any> {
  state = {
    list_title: "New List",
    list_description: "",
    list_is_private: false,
    list_tasks: [],
    task_title: "Task Title ...",
  }

  list_attr = () => {
    return {
      title: this.state.list_title,
      description: this.state.list_description,
      is_private: this.state.list_is_private,
      tasks_attributes: this.state.list_tasks
    }
  }

  add_task = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key !== "Enter") return
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
      <div>
        <NavBar />
        <div className="new_list">
          <h1 style={{ textAlign: "center" }}>
            <InputBase 
              placeholder={this.state.list_title}
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

          <div className="task-panel">
            <List subheader={
              <ListSubheader> Task List <small> {this.state.list_tasks.length} </small> </ListSubheader>
            }>
              <ListItem>
                <ListItemText onKeyDown={(e: any) => this.add_task(e)}>
                  <InputBase 
                    placeholder={this.state.task_title}
                    name="task_title"
                    onChange={(e: any) => this.set_field(e)} />
                </ListItemText>
              </ListItem>
              <Divider/>
              { list_tasks.map(
                (a_task: ITask, i: number) => 
                <Task 
                  key={i} 
                  draft 
                  task_title={a_task.title}/> 
                ) 
              }
            </List>
          </div>
        </div>
      </div>
    )
  }
}
