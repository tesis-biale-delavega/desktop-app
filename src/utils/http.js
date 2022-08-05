import axios from "axios";
import settings from "../settings.json";

const httpClient = axios.create();

const request = async (url, method, data) => {
  return httpClient({
    url: settings.baseUrl + url,
    method,
    data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error.response || { status: 500 };
    });
};

export const get = (url) => request(url, "GET", null);

export const post = (url, body) => request(url, "POST", body);

export const put = (url, body) => request(url, "PUT", body);

export const patch = (url, body) => request(url, "PATCH", body);

export const deleteReq = (url) => request(url, "DELETE");
