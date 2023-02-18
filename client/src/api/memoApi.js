import axiosClient from "./axiosClient";

const memoApi = {
  create: () => axiosClient.post("memo"),
};

export default memoApi;
