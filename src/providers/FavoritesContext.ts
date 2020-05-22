import  React from "react"

interface ToDoList {
  id: number
  title: string
  user_id?: number
  is_private?: boolean
  description: string
  [etc: string]: any
}

type Favorites = {
  favorite_list: ToDoList[],
  add_favorite(new_list: ToDoList): void,
  remove_favorite(id: number): void,
  is_favorite(id: number): boolean
}

export default React.createContext<Favorites>({
  favorite_list: [],
  add_favorite: (new_list: ToDoList) => console.log(new_list), 
  remove_favorite: (id: number) => console.log(id),
  is_favorite: (id: number) => id > 0
})

