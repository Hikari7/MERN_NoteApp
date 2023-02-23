import axiosClient from "./axiosClient";

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  getOne: (id) => axiosClient.get(`memo/${id}`),
  //params: titleを更新するのかdescriptionを更新するのか第二引数に入れる
  update: (id, params) => axiosClient.put(`memo/${id}`, params),
  delete: (id) => axiosClient.delete(`memo/${id}`),
  getFavorite: (id) => axiosClient.get(`memo/${id}`),
};

export default memoApi;
