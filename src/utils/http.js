import axios from "axios";
import settings from "../settings.json";

const httpClient = axios.create({
  baseURL: settings.baseUrl,
});

const request = async (url, method, data, headersConfig) => {
  return httpClient({
    url: url,
    method,
    data,
    ...{
      headers: {
        Authorization: localStorage.getItem("token"),
        ...headersConfig
      },
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error.response || { status: 500 };
    });
};

export const get = (url) => request(url, "GET", null);

export const post = (url, body, headersConfig) => request(url, "POST", body, headersConfig);

export const put = (url, body) => request(url, "PUT", body);

export const patch = (url, body) => request(url, "PATCH", body);

export const deleteReq = (url) => request(url, "DELETE");
