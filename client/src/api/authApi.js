import axiosClient from "./axiosClient";

const authApi = {
  //register関数を呼んだら"auth/register"が叩かれる
  //JSON形式でPOSTする場合は、axios.postの第2引数に、送信するデータをJavaScriptオブジェクトで指定
  register: (params) => axiosClient.post("auth/register", params),
  login: (params) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
