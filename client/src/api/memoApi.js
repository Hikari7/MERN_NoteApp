import axiosClient from "./axiosClient";

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  getOne: (id) => axiosClient.get(`memo/${id}`),
   update: (id, params) => axiosClient.put(`memo/${id}`, params),
  delete: (id) => axiosClient.delete(`memo/${id}`),
  getFavorites: () => axiosClient.get("memo/favorites"),
};

export default memoApi;
