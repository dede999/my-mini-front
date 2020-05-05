import React, {Component} from "react"
import api from "../../service/api";
import {get_headers} from "../../service/headers_handler";
import ShowLists from "../ShowLists";

export default class Lists extends Component<{}, any>{
  state = {
    favorites: [],
    all: []
  }

  componentDidMount() {
    this.load_favorites()
    this.load_projects()
  }

  load_favorites = async () => {
    await api.get("followed_lists", {
      headers: get_headers()
    }).then(resp => this.setState({ favorites: resp.data }))
  }

  load_projects = async () => {
    await api.get("lists", {
      headers: get_headers()
    }).then(resp => this.setState({ all: resp.data }))
  }

  render() {
    return <div>
      Hi !!
      <ShowLists lists={this.state.favorites} title="Followed"/>
      <ShowLists lists={this.state.all} title="All Lists" />
    </div>
  }
}
