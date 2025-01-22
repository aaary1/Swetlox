import axios from "axios";
import { BACKEDNURL } from "../config/config";

export const publicApi = axios.create({
  baseURL: BACKEDNURL + "/swetlox/v1",
});
export const privateApi = axios.create({
  baseURL: BACKEDNURL + "/swetlox/v1/api",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("auth"),
  },
});
