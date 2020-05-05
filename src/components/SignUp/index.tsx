import "./style.sass"
import React, { Component } from "react"
import { TextInput } from "evergreen-ui"
import api from "../../service/api";
import {save_headers} from "../../service/headers_handler";

interface FormState {
  email: string,
  password: string,
  password_confirmation: string
}

export default class SignUp extends Component<{}, FormState> {
  state = {
    email: '',
    password: '',
    password_confirmation: ''
  }

  sign_up = async () => {
    await api.post("auth", this.state)
      .then(resp => save_headers(resp.headers))
      .catch(err => console.log(err))
      .finally(() => window.location.reload(false))
  }

  render() {
    return (
      <div className="root">
        <div className="container">
          <h2 className="title"> Sing Up </h2>
          <div className="form">
            <TextInput placeholder="Email" className="formField"
                       onChange={(e: any) => this.setState({ email: e.target.value})} />
            <TextInput placeholder="Password" className="formField"
                       onChange={(e: any) => this.setState({ password: e.target.value})} />
            <TextInput placeholder="Password Confirmation" className="formField"
                       onChange={(e: any) => this.setState({ password_confirmation: e.target.value})} />
            <button className="formButton" onClick={this.sign_up}>
              Create User !
            </button>
          </div>
        </div>
      </div>
    )
  }
}
