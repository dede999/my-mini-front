
export const save_headers = (response: any) => {
  sessionStorage.setItem("accessToken", response["access-token"])
  const { client, uid } = response
  sessionStorage.setItem("uid", uid)
  sessionStorage.setItem("client", client)
}

export const clear_headers = () => {
  sessionStorage.removeItem("uid")
  sessionStorage.removeItem("client")
  sessionStorage.removeItem("accessToken")
}

export const get_headers = () => {
  return {
    uid: sessionStorage.getItem("uid"),
    client: sessionStorage.getItem("client"),
    "access-token": sessionStorage.getItem("accessToken")
  }
}

export const set_access_token = (token: string) => {
  sessionStorage.setItem("accessToken", token)
}

export const is_logged = () => {
  return !!sessionStorage.getItem("uid")
}
