import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
});

export const fetcher = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const res = await axiosInstance(config);
  return res.data;
};
