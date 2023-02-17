import authApi from "../api/authApi";

const authUtils = {
  //JWT認証チェック
  isAuthenticated: async () => {
    //JWTを取ってくる
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      //中身をチェックして、JWTの中に含んだユーザー情報を返す
      const res = await authApi.verifyToken();
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
