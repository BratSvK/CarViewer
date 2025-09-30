import axios from 'axios';
import LOCALIZATION from '../constants/localization';
import { showToast } from './toast';

// Vytvoríme inštanciu axiosu s default nastaveniami
const http = axios.create({
  baseURL: "http://10.10.194.186:5001/api",
  // timeout: 10000, // 10 sekúnd timeout
  timeout: 100000, // 100 sekúnd timeout
  headers: {
    "Content-Type": "application/json",
  },
});


// // Pridáme interceptor pre token (napr. Firebase JWT)
// http.interceptors.request.use(
//   async (config) => {
//     // tu si vieš načítať token z Firebase alebo AsyncStorage
//     const token = null; // napr. await AsyncStorage.getItem('jwt');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("HTTP error response:", error);
    if (error.response?.status === 401) {
      showToast("error", LOCALIZATION.httpErrors.unauthorized);
    } 
    else {
      const message =
        error.response?.data?.message || LOCALIZATION.httpErrors.networkError;
      showToast("error", message);
    }

    return Promise.reject(error);
  }
);

export default http;
