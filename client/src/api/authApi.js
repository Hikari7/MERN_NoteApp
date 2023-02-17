import axiosClient from "./axiosClient";

const authApi = {
  //register関数を呼んだら"auth/register"が叩かれる
  register: (params) => axiosClient.post("auth/register", params),
  login: (params) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
