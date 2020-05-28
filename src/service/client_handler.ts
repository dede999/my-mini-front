import api from './api'
import { is_logged, get_headers, clear_headers } from './headers_handler'

export const fetch_client = async () => {
  if(is_logged()) {
    await api.get("auth/validate_token", {
      headers: get_headers()
    }).then(resp => {
      const { id, name, nickname } = resp.data.data
      sessionStorage.setItem("id", id)
      sessionStorage.setItem("name", name)
      sessionStorage.setItem("nickname", nickname)
    }).catch(error => {
      if (error.response.status === 401) {
        clear_headers()
        delete_client()
      }
    })
  }
}

export const delete_client = () => {
  sessionStorage.removeItem("id")
  sessionStorage.removeItem("name")
  sessionStorage.removeItem("nickname")
}