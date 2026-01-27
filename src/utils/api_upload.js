// /* eslint-disable class-methods-use-this */
// import axios from "axios";

// import { getUserToken, clearLocalStorage } from "./localstorage";

// const axiosApiInstance = axios.create({
//   baseURL: uploadApi,
// });

// function parseError(err) {
//   const result = {
//     status: err.response.status,
//     ...err.response.data,
//   };

//   if (result.status === 401) {
//     clearLocalStorage();
//   }

//   return Promise.reject(result.error);
// }

// class __Api {
//   async get(endPoint, params = {}, signal = null) {
//     const token = getUserToken();
//     if (token) {
//       axiosApiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
//     }

//     try {
//       const response = await axiosApiInstance.get(endPoint, { params, signal });

//       if (typeof response.data.data === "boolean") {
//         return response.data;
//       }
//       if (typeof response.data === "string") {
//         return response.data;
//       }

//       if (response.data && response.data.data) {
//         const responseData = response.data.data;

//         if (Array.isArray(responseData)) {
//           return [...responseData];
//         }
//         return { ...responseData };
//       }

//       if (typeof response.data === "object") {
//         return { ...response.data };
//       }
//       return response.data;
//     } catch (err) {
//       console.error("Error occurred:", err);
//       if (err.message === "canceled") {
//         err.status = -1;
//         return "Request was canceled";
//       }
//       return parseError(err);
//     }
//   }

//   async post(endPoint, body, params = {}, signal = null) {
//     const token = getUserToken();

//     if (token) {
//       axiosApiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
//     }

//     try {
//       const response = await axiosApiInstance.post(endPoint, body, {
//         params,
//         signal,
//       });
//       if (response.data.data) {
//         return { ...response.data.data };
//       }

//       return { ...response.data };
//     } catch (err) {
//       if (err.message === "canceled") {
//         err.status = -1;

//         return Promise.reject();
//       }

//       return parseError(err);
//     }
//   }

//   async put(endPoint, body, signal = null) {
//     const token = getUserToken();
//     if (token) {
//       axiosApiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
//     }
//     try {
//       const response = await axiosApiInstance.put(endPoint, body, { signal });
//       if (response.data.data) {
//         return { ...response.data.data };
//       }
//       return { ...response.data };
//     } catch (err) {
//       if (err.message === "canceled") {
//         err.status = -1;
//         return Promise.reject();
//       }
//       return parseError(err);
//     }
//   }

//   async delete(endPoint) {
//     const token = getUserToken();
//     if (token) {
//       axiosApiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
//     }

//     try {
//       const response = await axiosApiInstance.delete(endPoint);

//       return { ...response.data };
//     } catch (err) {
//       return parseError(err);
//     }
//   }
// }

// export default function Api1() {
//   return new __Api();
// }
