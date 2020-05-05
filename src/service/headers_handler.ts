
export const save_headers = (response: any) => {
  localStorage.setItem("accessToken", response["access-token"])
  const { client, uid } = response
  localStorage.setItem("uid", uid)
  localStorage.setItem("client", client)
}

export const clear_headers = () => {
  localStorage.removeItem("uid")
  localStorage.removeItem("client")
  localStorage.removeItem("accessToken")
}

export const get_headers = () => {
  return {
    uid: localStorage.getItem("uid"),
    client: localStorage.getItem("client"),
    "access-token": localStorage.getItem("accessToken")
  }
}

export const set_access_token = (token: string) => {
  localStorage.setItem("accessToken", token)
}

export const is_logged = () => {
  return !!localStorage.getItem("uid")
}
