import React, {Component} from "react"
import SignUp from "../../components/SignUp";
import {is_logged} from "../../service/headers_handler";
import Lists from "../../components/Lists";

export default class Home extends Component<any, any> {

  render() {
    return (
      <div>
        {is_logged()
          ? <Lists/>
          : <SignUp />
        }
      </div>
    )
  }
}
