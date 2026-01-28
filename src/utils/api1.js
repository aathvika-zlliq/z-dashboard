// Api1.js
import axios from "axios";
import { getUserToken, clearLocalStorage } from "./localstorage";

function parseError(err) {
  const result = {
    status: err?.response?.status,
    ...err?.response?.data,
  };

  if (result.status === 401) {
    clearLocalStorage();
  }

  return Promise.reject(result?.error || result);
}

class _Api1 {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor ensures api_key header is always set before request
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = getUserToken();
        if (token) {
          config.headers["api-key"] = token; // ✅ token added here
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  async get(endPoint, params = {}, config = {}) {
    try {
      const response = await this.axiosInstance.get(endPoint, {
        params,
        ...config,
      });
      return response.data?.data ?? response.data;
    } catch (err) {
      return parseError(err);
    }
  }

  async post(endPoint, body = {}, config = {}) {
    try {
      const response = await this.axiosInstance.post(endPoint, body, {
        ...config,
      });
      return response.data?.data ?? response.data;
    } catch (err) {
      if (err.message === "canceled") {
        err.status = -1;
        return Promise.reject();
      }
      return parseError(err);
    }
  }

  async put(endPoint, body = {}, config = {}) {
    try {
      const response = await this.axiosInstance.put(endPoint, body, {
        ...config,
      });
      return response.data?.data ?? response.data;
    } catch (err) {
      return parseError(err);
    }
  }

  async delete(endPoint, config = {}) {
    try {
      const response = await this.axiosInstance.delete(endPoint, {
        ...config,
      });
      return response.data;
    } catch (err) {
      return parseError(err);
    }
  }
}

// Factory function
export default function Api1(baseURL) {
  return new _Api1(baseURL);
}
