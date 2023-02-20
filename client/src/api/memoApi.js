import axios from "axios";
import axiosClient from "./axiosClient";

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  getOne: (id) => axiosClient.get(`memo/${id}`),
};

export default memoApi;
