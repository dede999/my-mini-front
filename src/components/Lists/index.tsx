import api from "../../service/api"
import ShowLists from "../ShowLists"
import React, {Component} from "react"
import {get_headers} from "../../service/headers_handler"
import FavoritesContext from "../../providers/FavoritesContext"

interface ToDoList {
  id: number
  title: string
  user_id?: number
  is_private?: boolean
  description: string
  [etc: string]: any
}

interface IState {
  all: ToDoList[]
  favorites: ToDoList[]
}

export default class Lists extends Component<any, IState>{
  state = {
    all: [],
    favorites: []
  }

  componentDidMount() {
    this.load_projects()
    this.get_followed_lists()
  }

  get_followed_lists = async () => {
    await api.get("followed_lists", {
      headers: get_headers()
    }).then(resp => { this.setState({
      favorites: resp.data
    }) }).catch(err => { console.error(err) })
  }

  load_projects = async () => {
    await api.get("lists", {
      headers: get_headers()
    }).then(resp => this.setState({ all: resp.data }))
  }

  add_favorite = async (new_list: ToDoList) => {
    await api.post(`lists/${new_list.id}/follow`, {}, {
      headers: get_headers()
    }).then(() => this.setState({
      favorites: [...this.state.favorites, new_list]
    }))
  }

  remove_favorite = async (id: number) => {
    await api.delete(`lists/${id}/unfollow`, {
      headers: get_headers()
    }).then(() => {
      const filtered = this.state.favorites.filter(
        (list: ToDoList) => list.id !== id
      )
      this.setState({ favorites: filtered })
    })
  }

  is_favorite = (id: number): boolean => {
    const index = this.state.favorites.findIndex(
      (list: ToDoList) => list.id === id
    )
    return index >= 0 ? true : false
  }

  render() {
    return (
      <FavoritesContext.Provider value={{
        favorite_list: this.state.favorites,
        add_favorite: this.add_favorite, 
        remove_favorite: this.remove_favorite,
        is_favorite: this.is_favorite
      }}>
        <ShowLists favorites title="Followed"/>
        <ShowLists lists={this.state.all} title="All Lists" />
      </FavoritesContext.Provider>
    )
  }
}
