import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";

class HttpInterceptor {
  private instance: AxiosInstance;

  constructor() {
    const defaultOptions: AxiosRequestConfig = {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    this.instance = axios.create(defaultOptions);

    this.instance.interceptors.request.use(
      async (request) => {
        try {

          const authToken = Cookies.get("user");
          if (authToken) {
            const parsedToken = JSON.parse(authToken)?.token; 
            if (parsedToken) {
              request.headers.Authorization = `Bearer ${parsedToken}`;
            }
          }
        } catch (error) {
          console.error(error);
        }
        return request;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (!error.response) {
          console.error("[ERROR]", "[HTTP Interceptor, Network Error]", error);
        } else {
          switch (error.response.status) {
            case 401:
              console.error("[ERROR]", "[HTTP Interceptor, Status Code]", error.response.status);
              break;
            default:
              console.error("[ERROR]", "[HTTP Interceptor, Status Code]", error.response.status);
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

export default HttpInterceptor;
