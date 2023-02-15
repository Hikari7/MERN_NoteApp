import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

//setItemで取得したlocalStorageの情報を取ってくる
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

//リクエストの前処理
//axios intercepter: リクエストを送る前に前処理を捕まえることで何かしらの処理をする
//APIを叩く前に前処理(serverでも設定したauthorizationの形にしてserverに渡している)
axiosClient.interceptors.request.use(async (config) => {
  return {
    config,
    headers: {
      //JSON形式にする設定
      "Content-Type": "application/json",
      //サーバーに渡す前にJWTをリクエストして設定する必要がある(
      authorization: `Bearer ${getToken()}`, //リクエストヘッダーにJWTをつけてサーバーに渡す
    },
  };
});

//レスポンスの前処理
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
