import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

//setItemで取得したlocalStorageの情報(JWT)を取ってくる
const getToken = () => localStorage.getItem("token");

//axios.create()でインスタンスを作成
const axiosClient = axios.create({
  baseURL: BASE_URL,
});

//リクエストの前処理
//axios intercepter: リクエストを送る前に前処理を捕まえることで何かしらの処理をする
//APIを叩く前に前処理(serverでも設定したauthorizationの形にしてserverに渡している)
axiosClient.interceptors.request.use(async (config) => {
  return {
    //第二引数をカンマ区切りでかくと、その情報をconfigに入れ込むことができる
    //スプレッド構文にしたconfigにすると、新しい↓にヘッダーを挿入できるようになる
    ...config,
    headers: {
      //JSON形式にする設定(MIMEタイプ)
      "Content-Type": "application/json",
      //サーバーに渡す前にJWTをリクエストして設定する必要がある(
      authorization: `Bearer ${getToken()}`, //リクエストヘッダーにJWTをつけてサーバーに渡す
    },
  };
});

//レスポンスの前処理
axiosClient.interceptors.response.use(
  (response) => {
    //data属性の中のtokenを取り出す
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
