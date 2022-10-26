import Axios from "axios"
import { DOMAIN, TOKEN } from "../utils/config"

export class baseServices {
  get = (url) => Axios({
    url: `${DOMAIN}/${url}`,
    method: "GET",
    headers: {'Authorization':'Bearer ' + localStorage.getItem(TOKEN)}
  });

  post = (url, model) => Axios({
    url: `${DOMAIN}${url}`,
    method: "POST",
    model: model,
    headers: {'Authorization':'Bearer ' + localStorage.getItem(TOKEN)}
  });

  put = (url, model) => Axios({
    url: `${DOMAIN}${url}`,
    method: "PUT",
    model: model,
    headers: {'Authorization':'Bearer ' + localStorage.getItem(TOKEN)}
  });

  delete = (url, model) => Axios({
    url: `${DOMAIN}${url}`,
    method: "DELETE",
    model: model,
    headers: {'Authorization':'Bearer ' + localStorage.getItem(TOKEN)}
  })
}