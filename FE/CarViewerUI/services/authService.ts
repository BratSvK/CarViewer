import { AuthUser } from "../types/auth/authUser";
import http from "../util/http";

const BASE_PATH = "/auth";

const authService = {
  async register(email: string, password: string): Promise<AuthUser> {
    console.log("Register called with:", email, password);
    // const res = await http.post(`${BASE_PATH}/register`, `"${payload}"`);


    return { uid: "sdfsfsfsdfsfsf", email: "fake@gmail.com" }; 
  },

  async login(email: string, password: string): Promise<AuthUser> {
    console.log("Login called with:", email, password);
    return { uid: "sdfsfsfsdfsfsf", email: "fake@gmail.com" }; 
  },

  async forgotPassword(email: string): Promise<void> {
    // await auth().sendPasswordResetEmail(email);
    console.log("Calling API .NET:", email);
  },

  async tryAPI(payload: string): Promise<string> {
    // Simulácia volania API
    console.log("Calling API .NET:", payload);
    console.log(`Full URL: ${http.defaults.baseURL}${BASE_PATH}/demo`);

    const res = await http.post(`${BASE_PATH}/demo`, `"${payload}"`);
    return res.data;
  }
};

export default authService;
