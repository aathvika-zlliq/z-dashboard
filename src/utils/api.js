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

class _Api {
  constructor(baseURL) {
    this.axiosInstance = axios.create({ baseURL });
  }

  setAuthHeader(customHeaders) {
    const token = getUserToken();
    if (token && !customHeaders?.Authorization) {
      // Only set if not provided in custom headers
      this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }

  async get(endPoint, params = {}, config = {}) {
    // Merge default auth + custom headers
    this.setAuthHeader(config.headers);
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

  async post(endPoint, body, config = {}) {
    this.setAuthHeader(config.headers);
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

  async put(endPoint, body, config = {}) {
    this.setAuthHeader(config.headers);
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
    this.setAuthHeader(config.headers);
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

// Factory
export default function Api(baseURL) {
  return new _Api(baseURL);
}
