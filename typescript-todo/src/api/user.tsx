import { AxiosResponse } from "axios";
import HttpInterceptor from "../service/HttpInterceptor";
import Cookies from "js-cookie";
const http = new HttpInterceptor().getInstance();


export const loginUser = (
  data: any,
  callback: (response: AxiosResponse) => void
): void => {
  const endpoint = `/users/auth`;

  http
    .post(endpoint, data)
    .then((response: AxiosResponse) => {
      callback(response);
      Cookies.set("user", JSON.stringify(response.data.data),);
    })
    .catch((error) => {
      if (error.response) {
        callback(error.response);
      } else {
        console.error("Error:", error);
        callback({
          status: 500,
          data: { message: "Internal Server Error" },
        } as AxiosResponse);
      }
    });
};
export const logoutUser = (
  callback: (response: AxiosResponse) => void
): void => {
  const endpoint = `/users/logout`;

  http
    .post(endpoint)
    .then((response: AxiosResponse) => {
      callback(response);
      Cookies.remove("user");
    })
    .catch((error) => {
      if (error.response) {
        callback(error.response);
      } else {
        console.error("Error:", error);
        callback({
          status: 500,
          data: { message: "Internal Server Error" },
        } as AxiosResponse);
      }
    });
};

export const getUserInfo = (
  callback: (response: AxiosResponse) => void
): void => {
  const endpoint = `/users/currentuser`;

  http
    .get(endpoint)
    .then((response: AxiosResponse) => {
      callback(response);
    })
    .catch((error) => {
      if (error.response) {
        callback(error.response);
      } else {
        console.error("Error:", error);
        callback({
          status: 500,
          data: { message: "Internal Server Error" },
        } as AxiosResponse);
      }
    });
};