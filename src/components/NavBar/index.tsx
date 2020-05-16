import './style.sass'
import api from "../../service/api"
import React, {Component} from "react"
import { Link } from 'react-router-dom'
import { TextInput } from "evergreen-ui"
import {clear_headers, save_headers, is_logged} from '../../service/headers_handler'

type AuthHeaders = {
  uid: string | null,
  client: string | null,
  accessToken: string | null
}

interface Props {
  email: string,
  password: string,
  headers: AuthHeaders
}

export default class NavBar extends Component<{}, Props> {
  state = {
    headers: {
      uid: sessionStorage.getItem("uid"),
      client: sessionStorage.getItem("client"),
      accessToken: sessionStorage.getItem("accessToken"),
    },
    email: "Email",
    password: ""
  }

  is_logged_in = (): boolean => {
    return this.state.headers.uid !== null
  }

  logging_in = async () => {
    await api.post("auth/sign_in", {
        email: this.state.email,
        password: this.state.password,
    }).then(resp => {
      console.log(resp.data)
      save_headers(resp.headers)
    })
      .catch(err => console.error(err))
      .finally(() => window.location.reload(false))
  }

  logging_out = async () => {
    await api.delete("auth/sign_out", {
      headers: {
        uid: this.state.headers.uid,
        client: this.state.headers.client,
        "access-token": this.state.headers.accessToken
      }
    }).then(() => clear_headers())
      .catch(err => console.error(err)).finally(() => window.location.reload(false))
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="title">
          <h1>
            <Link to="/" id="main_title"> Mini App </Link>
          </h1>
          {is_logged() ? 
            <button>
              <Link to="/list/new">
                New List
              </Link>
            </button>: ""
          }
        </div>

        {is_logged()
          ? 
          <div id="client">
            { this.state.headers.uid }
            <button onClick={this.logging_out}>
              Log Out
            </button>
          </div>
          :
          <div id="login">
            <div id="fields">
              <TextInput
                placeholder={this.state.email}
                width={225}
                marginRight={10}
                onChange={(e: any) => this.setState({ email: e.target.value })} />
              <TextInput
                placeholder={this.state.password}
                type="password"
                width={225}
                onChange={(e: any) => this.setState({ password: e.target.value })} />
            </div>
            <div id="login-btn">
              <button onClick={this.logging_in}> Log In </button>
            </div>
          </div>
        }
      </div>
    )
  }
}
