import "./style.sass"
import api from "../../service/api"
import React, { Component } from "react"
import Task from "../Task"
import List from "@material-ui/core/List"
import SaveIcon from "@material-ui/icons/Save"
import { ListSubheader, ListItem, ListItemText, 
  InputBase, Divider, Button } from "@material-ui/core"
import { get_headers } from "../../service/headers_handler"


interface ITask {
  title: string,
  is_complete: boolean
}

interface IProps {
  id?: number
}

export default class ListBuilder extends Component<IProps, any> {
  state = {
    list_title: "New List",
    list_description: "",
    list_is_private: false,
    list_tasks: [],
    task_title: "Task Title ...",
    creation_mode: false
  }

  componentDidMount() {
    this.is_creation_mode()
  }

  is_creation_mode = () => {
    const { id } = this.props
    if (id === undefined) {
      this.setState({ creation_mode: true })
    }
    else {
      this.load_list(id)
      this.load_tasks(id)
    }
  }

  load_list = async (id: number) => {
    await api.get(`lists/${id}`, {
      headers: get_headers()
    }).then(resp => {
      const { title, description, is_private } = resp.data
      this.setState({
        list_title: title,
        list_description: description,
        list_is_private: is_private
      })
    })
  }

  load_tasks = async (id: number) => {
    await api.get(`lists/${id}/task`, {
      headers: get_headers()
    }).then(resp => {
      this.setState({ list_tasks: resp.data })
    })
  }

  list_attr = () => {
    return {
      title: this.state.list_title,
      description: this.state.list_description,
      is_private: this.state.list_is_private,
      tasks_attributes: this.state.list_tasks
    }
  }

  save_list = async () => {
    const attributes = this.list_attr()
    await api.post("/lists", {
      list: attributes
    }, {
      headers: get_headers()
    }).then(() => alert("List Created"))
    .catch(err => console.error(err))
    .finally(() => window.location.reload(false))
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

  remove_task = (title_task: string) => {
    const list_of_tasks = this.state.list_tasks.filter((task: ITask) => 
      task.title !== title_task)
    this.setState({ list_tasks: list_of_tasks })
  }
  
  set_field = (e: any) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  switcher = (value: boolean) => {
    this.setState({
      "list_is_private" : value
    })
  }

  privacy_status = () => {
    return this.state.list_is_private ? "private" : "public"
  }

  render() {
    const { list_tasks } = this.state

    return (
      <>
        <div className="new_list">
          <h1 style={{ textAlign: "center" }}>
            <InputBase
              placeholder={this.state.list_title}
              multiline
              name="list_title"
              className="MuiInputBase-input title"
              onChange={(e: any) => this.set_field(e)} />
          </h1>
          <form>
            <InputBase
              defaultValue={this.state.list_description}
              name="list_description"
              placeholder="List Description"
              multiline
              onChange={(e: any) => this.set_field(e)} />

            <Button
              variant="outlined"
              onClick={() => this.switcher(!this.state.list_is_private)}
              className={this.privacy_status()}>
              { this.privacy_status() }
            </Button>

            <Button
              size="large"
              className="save_btn"
              startIcon={<SaveIcon />}
              onClick={this.save_list}
            >
              Save
            </Button>
          </form>

          <div className="task-panel">
            <List subheader={
              <ListSubheader> Task List </ListSubheader>
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
                    task_title={a_task.title}
                    onDelete={this.remove_task} />)
              }
            </List>
          </div>
        </div>
      </>
    )
  }
}
