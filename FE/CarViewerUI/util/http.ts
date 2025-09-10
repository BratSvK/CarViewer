import axios from 'axios';

// Vytvoríme inštanciu axiosu s default nastaveniami
const http = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 10000, // 10 sekúnd timeout
  headers: {
    'Content-Type': 'application/json',
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

export default http;
