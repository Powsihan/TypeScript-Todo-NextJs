import { AxiosResponse } from "axios";
import HttpInterceptor from "../service/HttpInterceptor";

const http = new HttpInterceptor().getInstance();

export const GetAllTasks = (
  callback: (response: AxiosResponse) => void
): void => {
  const endpoint = `/task`; // No need for base URL here, it's already set in HttpInterceptor

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
