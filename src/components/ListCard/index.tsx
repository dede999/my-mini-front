import "./style.sass"
import React, {Component} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import FavoritesContext from "../../providers/FavoritesContext"

interface IProps {
  id: number
  title: string
  description: string
}

export default class ListCard extends Component<IProps, any>{

  render() {
    const { id, title, description } = this.props
    const list = { id, title, description }

    return (
      <FavoritesContext.Consumer>
        { ({ add_favorite, remove_favorite, is_favorite }) => (
          <div className="card">
            <div className="title"> 
              <h4> { title } </h4>
              {
                is_favorite(id)
                ? <FontAwesomeIcon icon={faMinus} onClick={() => remove_favorite(id)} />
                : <FontAwesomeIcon icon={faPlus} onClick={() => add_favorite(list)} />
              }
            </div>
            <div className="description">
              { description }
            </div>
          </div>
        )}
      </FavoritesContext.Consumer>
    )
  }
}
