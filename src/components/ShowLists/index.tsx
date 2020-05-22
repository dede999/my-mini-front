import "./styles.sass"
import ListCard from "../ListCard"
import React, {Component} from "react"
import FavoritesContext from "../../providers/FavoritesContext"

interface List {
  id: number,
  title: string,
  user_id?: number
  is_private?: boolean,
  description: string,
  [etc: string]: any
}

interface Props {
  lists?: List[]
  title: string
  favorites?: boolean
}

export default class ShowLists extends Component<Props, any>{

  componentDidMount() {
    if(!this.can_it_mount()) {
      throw new Error(
        "You must pass a list or a sign to show the favorites"
      ) 
    }
  }

  can_it_mount = (): boolean => {
    const { lists, favorites } = this.props
    return !!lists !== favorites
  }

  render() {
    const { lists, title, favorites } = this.props

    return (
      <div className="show-lists">
        <h1 className="divider line glow"> { title } </h1>
        <div className="container">
          <FavoritesContext.Consumer>
            {({ favorite_list }) => (
              !!favorites
              ? favorite_list?.map((list: List) => 
                  <ListCard 
                    id={list.id} 
                    key={list.id} 
                    title={list.title} 
                    description={list.description}/>)
              : lists?.map((list: List) => 
                  <ListCard 
                    id={list.id} 
                    key={list.id} 
                    title={list.title} 
                    description={list.description}/>) 
            )}
          </FavoritesContext.Consumer>
        </div>
      </div>
    )
  }
}
